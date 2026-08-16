import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'How to report a bug, request a tool, or ask about OnlineTools.',
};

/**
 * TODO: replace with the address you want published.
 *
 * Left as a placeholder deliberately — putting a personal inbox on a public
 * page invites scrapers, so a dedicated or forwarding address is usually the
 * better choice. Setting this turns the notice below into a mailto link.
 */
export const CONTACT_EMAIL = '';

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
      {CONTACT_EMAIL ? (
        <p>
          Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. It is
          a small operation, so a reply may take a few days.
        </p>
      ) : (
        <p className="panel p-4 !mt-4 text-[13px] text-ink-muted">
          A contact address has not been published yet. Set{' '}
          <code>CONTACT_EMAIL</code> in{' '}
          <code>app/(legal)/contact/page.tsx</code> to turn this into a real
          mailto link and reveal the footer link.
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
