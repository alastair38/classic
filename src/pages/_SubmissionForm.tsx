import { Form, Input, Textarea } from '@components/utilities/SendForm';

import { createForm } from 'simple:form';
import { z } from 'zod';

export const ticketForm = createForm({
  email: z
    .string({
      required_error: '❌ Your email is required',
    })
    .email({ message: '❌ Invalid email address' }),
  message: z.string({ required_error: '❌ Please enter your message' }),
  newsletter: z.boolean().optional(),
});

export default function SubmissionForm() {
  return (
    <>
      <Form
        className="flex border flex-col-reverse col-start-2 text-base-600 w-full mx-auto gap-6 rounded-md shadow-xl p-6"
        validator={ticketForm.validator}
      >
        <p className="italic">
          <span className="text-[red] mr-1">*</span>Fields marked with an
          asterix are required
        </p>
        <div className="space-y-6">
          <div className="flex flex-col space-y-3 relative">
            <label
              className="text-sm font-bold flex justify-between items-center"
              htmlFor="email"
            >
              Email
              <span className="text-[red] text-xl">*</span>
            </label>
            <Input
              className="rounded-md border p-2"
              id="email"
              {...ticketForm.inputProps.email}
            />
          </div>
          <div className="space-y-3 flex flex-col relative">
            <label
              className="text-sm font-bold flex items-center justify-between"
              htmlFor="message"
            >
              Message
              <span className="text-[red] text-xl">*</span>
            </label>
            <Textarea
              className="rounded-md border min-h-44 p-2"
              id="message"
              {...ticketForm.inputProps.message}
            ></Textarea>
          </div>
          <div className="flex items-center gap-2 relative">
            <label className="text-sm font-bold" htmlFor="newsletter">
              Sign up for our newsletter
            </label>
            <Input
              className="rounded-md h-5 w-5 accent-tertiary-300"
              id="newsletter"
              {...ticketForm.inputProps.newsletter}
            />
          </div>
          <button className="bg-base-900 rounded-md text-light px-6 py-2">
            Send your message
          </button>
        </div>
      </Form>
    </>
  );
}
