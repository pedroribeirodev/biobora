"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 flex flex-col items-center justify-between py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight mb-6">
          Crie sua página bio <br className="hidden md:block" /> em minutos
        </h1>
        <p className="text-slate-600 text-lg md:text-2xl max-w-xl mx-auto">
          Com o <span className="font-semibold">BioBora</span>, você personaliza, compartilha e converte. <br className="hidden md:block" /> Tudo em um só lugar, do seu jeito.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-xl mt-12"
      >
        <Card className="shadow-2xl border-slate-200">
          <CardContent className="p-8 md:p-10">
            <form className="space-y-6" aria-label="Formulário de cadastro para receber notificações de lançamento">
              <label htmlFor="email-input" className="block text-base font-medium text-slate-700">
                Cadastre seu melhor e-mail para receber o lançamento
              </label>
              <div className="flex flex-col md:flex-row gap-3">
                <Input 
                  id="email-input"
                  type="email" 
                  placeholder="ex: voce@email.com" 
                  className="flex-1 h-12 text-base" 
                  required
                  aria-required="true"
                  aria-label="Digite seu e-mail"
                />
                <Button type="submit" size="lg" className="h-12 text-base" aria-label="Enviar e-mail para receber notificação de lançamento">
                  <Mail className="w-4 h-4 mr-2" aria-hidden="true" /> Quero ser avisado
                </Button>
              </div>
              <p className="text-sm text-slate-500 text-center md:text-left">
                Prometemos não enviar spam. Só avisaremos sobre o lançamento.
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-20 grid md:grid-cols-3 gap-6 w-full max-w-6xl"
        role="region"
        aria-label="Funcionalidades principais"
      >
        <Card className="p-6 shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2 text-slate-800">Visual profissional</h3>
          <p className="text-sm text-slate-600">Layouts personalizáveis que combinam com seu estilo e sua marca.</p>
        </Card>
        <Card className="p-6 shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2 text-slate-800">Link para tudo</h3>
          <p className="text-sm text-slate-600">Reúna seus contatos, redes sociais e links importantes em um só lugar.</p>
        </Card>
        <Card className="p-6 shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2 text-slate-800">Foco em conversão</h3>
          <p className="text-sm text-slate-600">Inclua botões para WhatsApp, e-mail, captura de leads e mais.</p>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-24 w-full max-w-6xl"
        role="region"
        aria-label="Exemplos de páginas BioBora"
      >
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">
          Exemplos reais de páginas BioBora
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="overflow-hidden rounded-2xl shadow-lg border border-slate-200">
              <Image
                src={`/examples/example-${i}.svg`}
                alt={`Exemplo de página BioBora ${i} mostrando layout personalizado com links e informações`}
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                loading="lazy"
                unoptimized
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
