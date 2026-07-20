import { MessageCircle } from "lucide-react";
import { contact } from "@/content/site";

export function WhatsAppButton() {
  if (!contact.whatsapp) return null; // Oculto até que um número válido seja informado.

  return (
    <a
      href={`https://wa.me/${contact.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="focus-ring fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-success text-white shadow-soft transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
