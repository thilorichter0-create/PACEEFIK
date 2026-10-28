import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ServiceFaq } from "@/content/services";

type Props = { faqs: ServiceFaq[]; heading?: string };

export default function FAQList({ faqs, heading = "Common questions" }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section className="faq-section content-section">
      <div className="section-heading"><p className="eyebrow">Answers before you begin</p><h2>{heading}</h2></div>
      <div className="faq-list">
        {faqs.map((faq, index) => {
          const open = openIndex === index;
          return (
            <article className="faq-item" key={faq.question}>
              <h3><button type="button" aria-expanded={open} onClick={() => setOpenIndex(open ? null : index)}>{faq.question}<ChevronDown size={19} className={open ? "is-rotated" : ""} /></button></h3>
              {open && <p>{faq.answer}</p>}
            </article>
          );
        })}
      </div>
    </section>
  );
}
