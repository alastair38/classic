import { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const EmailForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;
    // setIsSubmitting(true);
    const subToast = toast.loading('Submitting…');

    const formData = new FormData(e.currentTarget);
    const formInputs = Object.fromEntries(formData);

    const email = formInputs.email;
    const message = formInputs.message;

    // email exists

    if (!emailRegexp.test(email.toString()) && !message) {
      return toast.error('Please provide a valid email address and message', {
        id: subToast,
      });
    }

    if (!emailRegexp.test(email.toString())) {
      return toast.error('Please provide a valid email address', {
        id: subToast,
      });
    }
    if (!email && !message) {
      return toast.error('Please provide an email address and message', {
        id: subToast,
      });
    }

    if (email && !message) {
      return toast.error('Please provide a message', {
        id: subToast,
      });
    }

    if (!message && email) {
      //setIsSubmitting(false);
      return toast.error('Please provide a message', {
        id: subToast,
      });
    }

    // validate email
    // if (!validateEmail((email as string).trim())) {
    //   return toast.error("Please provide a valid email address", {
    //     id: subToast,
    //   });
    // }

    try {
      const res = await fetch('/api/sendmail.json', {
        method: 'POST',
        body: JSON.stringify(formInputs),
        headers: {
          'Content-type': 'application/json',
        },
      });

      const responseMessage = await res.json();

      if (responseMessage.status === 400) {
        toast.error(responseMessage.message, {
          duration: 7000,
          id: subToast,
        });
      }
      if (responseMessage.status === 200) {
        formRef.current?.reset();
        setIsSuccess(true);
        toast.success(responseMessage.message, {
          duration: 7000,
          id: subToast,
        });
      }

      setIsSubmitting(false);
    } catch (e) {
      // setIsSubmitting(false);
      console.log(e);
      toast.error('There was a problem sending your email. Please try again.', {
        id: subToast,
      });
      if (e instanceof Error) {
        return console.error(e.message);
      }
      console.error(e);
    }
  };

  return (
    <>
      <form
        ref={formRef}
        className="flex border flex-col col-start-2 text-base-600 mx-auto gap-6 rounded-md shadow-xl p-6 w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col space-y-3">
          <label className="text-sm font-bold" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md border p-2 focus-visible:outline-base-300 focus-visible:bg-base-100"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="flex flex-col space-y-3">
          <label className="text-sm font-bold" htmlFor="email">
            Enter your message
          </label>
          <textarea
            className="p-3 border rounded-md focus-visible:outline-base-300 focus-visible:bg-base-100"
            name="message"
            id="message"
          ></textarea>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-bold" htmlFor="newsletter">
            Subscribe to newsletter
          </label>
          <input
            className="h-5 w-5 accent-tertiary-300"
            type="checkbox"
            name="newsletter"
            id="newsletter"
          />
        </div>

        <button
          className="bg-tertiary-300 outline-2 focus-visible:outline hover:outline outline-offset-2 outline-tertiary-300 rounded-md text-dark px-6 py-2 disabled:bg-base-200"
          type="submit"
          disabled={isSubmitting}
        >
          Send message
        </button>
      </form>

      <Toaster />
    </>
  );
};
export default EmailForm;
