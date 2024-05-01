import type { APIRoute } from 'astro';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import sanitizeHtml from 'sanitize-html';

export const prerender = false;

const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: 'api',
  key: import.meta.env.MAILGUN_API_KEY,
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // check that an email and/or a valid email has been entered
    if (!data.email || !emailRegexp.test(data.email.toString())) {
      throw new Error('Please provide a valid email');
    }

    // check that message exists
    if (!data.message) {
      throw new Error('Please provde a message');
    }

    // this will strip any tags that have been added to the textarea message so only a plain string will be sent
    const sanitizedMsg = sanitizeHtml(data.message, {
      allowedTags: [],
      allowedAttributes: {},
    });

    // send email
    const sendMail = await mg.messages.create(import.meta.env.MAILGUN_DOMAIN, {
      from: data.email,
      to: ['alastair@alastaircox.com'],
      subject: `Website enquiry`,
      text: `${data.message}`,
      html: `<table style="padding-bottom: 32px; padding-top: 32px;" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td align="center">
                <table cellpadding="0" cellspacing="0" border="0">
                  <tr>
                            <td  style="text-align: left; font-size: 16px; line-height: 1.6; border-bottom: 1px solid lightgray; padding: 16px 0;">
                              <strong style="display: block;">From:</strong><p>${
                                data.email
                              }</p>
                            </td>
                  </tr>
                  <tr>
                            <td  style="text-align: left; font-size: 16px; line-height: 1.6; border-bottom: 1px solid lightgray; padding: 16px 0;">
                              <strong style="display: block;">Message:</strong><p>${sanitizedMsg}</p>
                            </td>
                  </tr>
                  <tr>
                            <td  style="text-align: left; font-size: 16px; line-height: 1.6; border-bottom: 1px solid lightgray; padding: 16px 0;">
                              <strong style="display: block;">Newsletter:</strong><p>${
                                data.newsletter === 'on'
                                  ? 'subscribed'
                                  : 'not subscribed'
                              }</p>
                            </td>
                  </tr>
                </table>
            </td>
        </tr>
    </table>`,
    });

    // const successMsg = (msg: any) => msg;

    //console.log(sendMail);

    // if (!sendMail) {
    //   throw new Error('Subscribing failed');
    // }

    return new Response(
      JSON.stringify({
        message: '👀 Thanks for your message. We will be in touch shortly.',
        status: 200,
      }),
      {
        status: 200,
        statusText: 'OK',
      }
    );
  } catch (e) {
    if (e instanceof Error) {
      return new Response(
        JSON.stringify({
          message:
            'There was a problem. This page does not have the correct authorization to deliver your email. Please inform the website owner.',
          status: 400,
        }),
        {
          status: 400,
          statusText: e.message,
        }
      );
    }
    return new Response(null, {
      status: 400,
      statusText: 'There is an unexpected error',
    });
  }
};
