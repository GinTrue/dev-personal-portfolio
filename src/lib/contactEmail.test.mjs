import assert from "node:assert/strict";
import test from "node:test";
import { buildContactEmail, buildEmailDrafts, getEmailConfiguration, getEmailFailure } from "./contactEmail.js";

const recipient = { name: "Portfolio Owner", email: "owner@example.com" };
const submission = { name: "  Avery Visitor  ", email: "  avery+project@example.com  ", message: "  A project with R&D, links, and a question?  ", projectType: "Business system" };

test("contact templates receive the owner as recipient and the visitor as reply-to", () => {
  const params = buildContactEmail(submission, recipient, new Date("2026-10-27T12:00:00Z"));
  assert.equal(params.to_email, "owner@example.com");
  assert.equal(params.to_name, "Portfolio Owner");
  assert.equal(params.reply_to, "avery+project@example.com");
  assert.equal(params.from_email, params.reply_to);
  assert.equal(params.email, params.reply_to);
  assert.equal(params.name, "Avery Visitor");
  assert.equal(params.from_name, params.name);
  assert.equal(params.time, "2026-10-27T12:00:00.000Z");
  assert.equal(params.title, params.subject);
  assert.ok(params.subject.includes("Business system"));
});

test("message-only templates still include sender contact details and the selected project type", () => {
  const { message } = buildContactEmail(submission, recipient);
  assert.match(message, /^A project with R&D, links, and a question\?/);
  assert.match(message, /From: Avery Visitor/);
  assert.match(message, /Reply to: avery\+project@example.com/);
  assert.match(message, /Project type: Business system/);
});

test("Gmail and mailto drafts preserve punctuation, plus addresses, and line breaks", () => {
  const params = buildContactEmail(submission, recipient);
  const drafts = buildEmailDrafts(params);
  const gmail = new URL(drafts.gmail);
  assert.equal(gmail.searchParams.get("to"), recipient.email);
  assert.equal(gmail.searchParams.get("su"), params.subject);
  assert.equal(gmail.searchParams.get("body"), params.message);
  const rawQuery = drafts.mailto.split("?")[1];
  assert.ok(rawQuery.includes("%20"));
  assert.ok(rawQuery.includes("%2B"));
  assert.equal(new URLSearchParams(rawQuery).get("body"), params.message);
  assert.equal(drafts.mailto.split("?")[0], "mailto:owner@example.com");
});

test("empty or example settings cannot silently enable the direct-send button", () => {
  const keys = { VITE_EMAILJS_SERVICE_ID: " service_test ", VITE_EMAILJS_TEMPLATE_ID: " template_test ", VITE_EMAILJS_PUBLIC_KEY: " test-public-key " };
  const config = getEmailConfiguration(keys);
  assert.equal(config.configured, true);
  assert.equal(config.serviceId, "service_test");
  for (const key of Object.keys(keys)) {
    for (const value of ["", "  ", "your_public_key", undefined]) assert.equal(getEmailConfiguration({ ...keys, [key]: value }).configured, false);
  }
});

test("provider failures keep the actual diagnostic and distinguish rate limits and network failures", () => {
  const provider = getEmailFailure({ status: 422, text: "The recipients address is empty" });
  assert.equal(provider.code, 422);
  assert.equal(provider.detail, "The recipients address is empty");
  assert.match(provider.message, /error 422/);
  assert.match(provider.message, /message is still here/);
  assert.match(getEmailFailure({ status: 429, text: "Too Many Requests" }).message, /wait a minute/);
  assert.match(getEmailFailure(new TypeError("Failed to fetch")).message, /connection/);
  assert.equal(getEmailFailure("The public key is required").detail, "The public key is required");
});

test("sender names cannot add extra lines to the email subject", () => {
  const params = buildContactEmail({ ...submission, name: "Avery\r\nAnother header" }, recipient);
  assert.doesNotMatch(params.subject, /[\r\n]/);
});

test("the observed Gmail invalid-grant failure gives the owner a specific reconnect action", () => {
  const failure = getEmailFailure({ status: 412, text: "Gmail_API: Invalid grant. Please reconnect your Gmail account" });
  assert.equal(failure.code, 412);
  assert.match(failure.recoveryHint, /Reconnect the Gmail account/);
  assert.match(failure.recoveryHint, /current service ID/);
  assert.equal(getEmailFailure({ status: 400, text: "Invalid template ID" }).recoveryHint, "");
});
