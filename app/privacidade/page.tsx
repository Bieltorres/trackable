import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/registro">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Registro
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Política de Privacidade</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-3">1. Informações que Coletamos</h3>
                <p className="text-muted-foreground">
                  Coletamos informações que você nos fornece diretamente, como nome, email e outras informações de
                  cadastro.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">2. Como Usamos suas Informações</h3>
                <p className="text-muted-foreground">
                  Usamos suas informações para fornecer, manter e melhorar nossos serviços, processar transações e
                  comunicar com você.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">3. Compartilhamento de Informações</h3>
                <p className="text-muted-foreground">
                  Não vendemos, trocamos ou transferimos suas informações pessoais para terceiros sem seu consentimento.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">4. Segurança</h3>
                <p className="text-muted-foreground">
                  Implementamos medidas de segurança adequadas para proteger suas informações pessoais contra acesso não
                  autorizado.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">5. Cookies</h3>
                <p className="text-muted-foreground">
                  Utilizamos cookies para melhorar sua experiência em nossa plataforma e analisar como nossos serviços
                  são utilizados.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">6. Contato</h3>
                <p className="text-muted-foreground">
                  Se você tiver dúvidas sobre esta política de privacidade, entre em contato conosco através do email:
                  contato@exemplo.com
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
