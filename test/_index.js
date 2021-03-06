import { expect } from 'chai';
import { describe, it } from 'mocha';
import now from 'performance-now';
import isValidEmail from '../src';

describe('Check valid emails.', () => {
  const simpleEmail = 'simple@example.com';
  it(
    `Simple emails are valid. (${simpleEmail})`,
    () => expect(isValidEmail(simpleEmail)).to.equal(true),
  );
  const periodEmail = 'very.common@example.com';
  it(
    `Emails with periods are valid. (${periodEmail})`,
    () => expect(isValidEmail(periodEmail)).to.equal(true),
  );
  const emailWSymbol = 'disposable.style.email.with+symbol@example.com';
  it(
    `Emails with symbols are valid. (${emailWSymbol})`,
    () => expect(isValidEmail(emailWSymbol)).to.equal(true),
  );
  const emailWHyphen = 'other.email-with-hyphen@example.com';
  it(
    `Emails with hyphens are valid. (${emailWHyphen})`,
    () => expect(isValidEmail(emailWHyphen)).to.equal(true),
  );
  const emailWTag = 'user.name+tag+sorting@example.com';
  it(
    `Emails with tags and sorting are valid. (${emailWTag})`,
    () => expect(isValidEmail(emailWTag)).to.equal(true),
  );
  const emailWSingleLetterLocal = 'x@example.com';
  it(
    `Emails with a single letter local are valid. (${emailWSingleLetterLocal})`,
    () => expect(isValidEmail(emailWSingleLetterLocal)).to.equal(true),
  );
  // This scenario has to be extremely rare and is very difficult to setup. Ignoring for now.
  // eslint-disable-next-line max-len, no-useless-escape
  // const unusualButValid = '"very.(),:;<>[]\".VERY.\"very@\\ \"very\".unusual"@strange.example.com';
  // it(
  //   `Emails with a very unusual set of characters are valid. (${unusualButValid})`,
  //   () => expect(isValidEmail(unusualButValid)).to.equal(true),
  // );
  const emailWHyphenDomain = 'example-indeed@strange-example.com';
  it(
    `Emails with a hyphenated domain are valid. (${emailWHyphenDomain})`,
    () => expect(isValidEmail(emailWHyphenDomain)).to.equal(true),
  );
  // This scenario would only be valid for a local server environment. Ignoring for now.
  // const emailWTLD = 'admin@mailserver1';
  // it(
  //   `Emails with only a Top Level Domain are valid. (${emailWTLD})`,
  //   () => expect(isValidEmail(emailWTLD)).to.equal(true),
  // );
  const emailWOneLetterDomain = 'example@s.example';
  it(
    `Emails with one letter domain are valid. (${emailWOneLetterDomain})`,
    () => expect(isValidEmail(emailWOneLetterDomain)).to.equal(true),
  );
  const emailWShortTLD = 'admin@test.co';
  it(
    `Email with short Top Level Domain are valid. (${emailWShortTLD})`,
    () => expect(isValidEmail(emailWShortTLD)).to.equal(true),
  );
  const emailWSpaceBetweenQuotes = '" "@example.org';
  it(
    `Email with space between quotes for username are valid. (${emailWSpaceBetweenQuotes})`,
    () => expect(isValidEmail(emailWSpaceBetweenQuotes)).to.equal(true),
  );
});

describe('Check invalid emails.', () => {
  const emailWOAt = 'Abc.example.com';
  it(
    `Emails without at symbol are invalid. (${emailWOAt})`,
    () => expect(isValidEmail(emailWOAt)).to.equal(false),
  );
  const emailWAtFirst = '@Abc.example.com';
  it(
    `Emails with the at symbol at the beginning are invalid. (${emailWAtFirst})`,
    () => expect(isValidEmail(emailWAtFirst)).to.equal(false),
  );
  const emailWODomainPeriod = 'james@google';
  it(
    `Emails without a period in the domain are invalid. (${emailWODomainPeriod})`,
    () => expect(isValidEmail(emailWODomainPeriod)).to.equal(false),
  );
  const emailWPeriodNearEnd = 'james@google.c';
  it(
    `Emails with periods that are less than 2 chars from the end are invalid. (${emailWPeriodNearEnd})`,
    () => expect(isValidEmail(emailWPeriodNearEnd)).to.equal(false),
  );
  const emailWSpaceButNoQuotes = 'james richards@google.com';
  it(
    `Emails with spaces but no quotes are invalid. (${emailWSpaceButNoQuotes})`,
    () => expect(isValidEmail(emailWSpaceButNoQuotes)).to.equal(false),
  );
  const emailWSpaceButOnlyQuoteBefore = 'james" richards@google.com';
  it(
    `Emails with spaces but only a quote before or after are invlaid. (${emailWSpaceButOnlyQuoteBefore})`,
    () => expect(isValidEmail(emailWSpaceButOnlyQuoteBefore)).to.equal(false),
  );
  const emailWInvalidDomainChars = 'james@cb$.com';
  it(
    `Emails with invalid chars in the domain are invalid. (${emailWInvalidDomainChars})`,
    () => expect(isValidEmail(emailWInvalidDomainChars)).to.equal(false),
  );
  const emailWMultiAts = 'A@b@c@example.com';
  it(
    `Emails with multiple ats are invalid. (${emailWMultiAts})`,
    () => expect(isValidEmail(emailWMultiAts)).to.equal(false),
  );
  const emailWUnquotedSpecialChars = 'a"b(c)d,e:f;g<h>i[j\\k]l@example.com';
  it(
    `Emails with unquoted special chars are invalid. (${emailWUnquotedSpecialChars})`,
    () => expect(isValidEmail(emailWUnquotedSpecialChars)).to.equal(false),
  );
  const emailWQuoteButNoDots = 'just"not"right@example.com';
  it(
    `Emails with quotes that are not the only thing but not seperated by dots are invalid. (${emailWQuoteButNoDots})`,
    () => expect(isValidEmail(emailWQuoteButNoDots)).to.equal(false),
  );
  const emailWQuoteButMissingDots = 'just."not"right@example.com';
  it(
    `Emails with quotes that are not the only thing but are missing some of the dots that should surround quotes are invalid. (${emailWQuoteButMissingDots})`,
    () => expect(isValidEmail(emailWQuoteButMissingDots)).to.equal(false),
  );
  const emailWTooLongLocal = '1234567890123456789012345678901234567890123456789012345678901234+x@example.com';
  it(
    `Emails with more than 64 chars are invalid. (${emailWTooLongLocal})`,
    () => expect(isValidEmail(emailWTooLongLocal)).to.equal(false),
  );
  const doubleDotBeforeAt = 'john..doe@example.com';
  it(
    `Emails with 2 dots together in the local are invalid. (${doubleDotBeforeAt})`,
    () => expect(isValidEmail(doubleDotBeforeAt)).to.equal(false),
  );
  const doubleDotAfterAt = 'john.doe@example..com';
  it(
    `Emails with 2 dots together after the at are invalid. (${doubleDotAfterAt})`,
    () => expect(isValidEmail(doubleDotAfterAt)).to.equal(false),
  );
});

describe('Check run time for 1000 emails.', () => {
  const validEmail = 'test@google.com';
  const maxTime = 20;
  it(
    `Valid emails run 1000 times should take less than ${maxTime} milliseconds.`,
    () => {
      const startTime = now();
      for (let i = 0; i < 1000; i += 1) {
        isValidEmail(validEmail);
      }
      const endTime = now();

      return expect(endTime - startTime).to.be.below(maxTime);
    },
  );
  const invalidEmail = 'invalid@cb$.com';
  it(
    `Invalid emails run 1000 times should take less than ${maxTime} milliseconds.`,
    () => {
      const startTime = now();
      for (let i = 0; i < 1000; i += 1) {
        isValidEmail(invalidEmail);
      }
      const endTime = now();

      return expect(endTime - startTime).to.be.below(maxTime);
    },
  );
});
