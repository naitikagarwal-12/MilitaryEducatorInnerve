import { useState } from "react";
import Header from "../components/Header";
import { sendContactMessage } from "../api/contact";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setStatus("");

    try {
      await sendContactMessage({ name, email, subject, message });
      setStatus("Message sent successfully. Please check your email.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setStatus(err.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#27395f]">
      <Header />

      <section className="bg-[#0b0b0b]/20 text-white py-6 px-6 md:px-12 lg:px-24 w-full min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold">
            Contact <span className="text-[#b0be64]">Us</span>
          </h1>
          <p className="mt-4 text-gray-400 text-sm md:text-base">
            Reach out for defense exam guidance, tactical intelligence queries,
            or platform support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12">
          <div className="bg-[#121212]/50 rounded-2xl py-2 px-4 shadow-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-1">
              Get In Touch
            </h2>
            <p className="text-sm md:text-md text-gray-400 mb-6 leading-relaxed">
              We support students preparing for defense examinations and
              professionals seeking structured tactical knowledge.
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-[#b0be64] font-medium">Email</p>
                <p className="text-gray-200">support@militaryeducator.in</p>
              </div>

              <div>
                <p className="text-[#b0be64] font-medium">Phone</p>
                <p className="text-gray-200">+91 9XXXXXXXXX</p>
              </div>

              <div>
                <p className="text-[#b0be64] font-medium">Location</p>
                <p className="text-gray-200">Kota, Rajasthan</p>
              </div>
            </div>
          </div>

          <div className="bg-[#121212]/50 rounded-2xl py-2 px-4 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#b0be64]"
                required
              />

              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#b0be64]"
                required
              />

              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#b0be64]"
                required
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#b0be64]"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#b0be64] text-black font-semibold py-2 rounded-lg hover:bg-[#9aaa50] transition disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {status && <p className="text-center text-sm mt-2">{status}</p>}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
