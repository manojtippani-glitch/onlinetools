import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'How to report a bug, request a tool, or ask about OnlineTools.',
};

/**
 * Ways for people to reach you. Set either, or both.
 *
 * CONTACT_EMAIL is deliberately empty: putting a personal inbox on a public
 * page invites scrapers, so use a dedicated address or an alias. Until one
 * of these is set, the page explains that in visitor-facing terms rather
 * than showing a dead mailto.
 */
export const CONTACT_EMAIL = '';
export const ISSUES_URL = '';

export default function Contact() {
  return (
    <>
      <h1 className="headline text-[2rem] mb-6">Contact</h1>

      <p className="lead">
        Bug reports and requests for new tools are both welcome. So is being
        told that a converter gave you the wrong answer — that is the most
        useful message we can get.
      </p>

      <h2>Getting in touch</h2>
      {CONTACT_EMAIL && (
        <p>
          Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. This
          is a small operation, so a reply may take a few days.
        </p>
      )}
      {ISSUES_URL && (
        <p>
          Bugs and tool requests can also go straight to{' '}
          <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer">
            the issue tracker
          </a>
          , which is usually the faster route.
        </p>
      )}
      {!CONTACT_EMAIL && !ISSUES_URL && (
        <p>
          A public contact address is being set up and will appear here
          shortly. In the meantime, the notes below cover what is most useful
          to include when it is ready.
        </p>
      )}

      <h2>Reporting a wrong result</h2>
      <p>
        If a tool produced something incorrect, the fastest fix comes from
        including three things: which tool, exactly what you put in, and what
        you expected instead. Most tools carry your input in the URL, so
        copying the address bar usually captures the first two at once.
      </p>

      <h2>Suggesting a tool</h2>
      <p>
        The tools here exist because they are the ones people look up over and
        over. If something you reach for is missing, say what you use it for —
        that context decides whether it gets built and how.
      </p>

      <h2>Privacy questions</h2>
      <p>
        What is and is not collected is set out in the{' '}
        <Link href="/privacy">privacy policy</Link>. The short version is that
        the tools run in your browser and your input never reaches us.
      </p>
    </>
  );
}
