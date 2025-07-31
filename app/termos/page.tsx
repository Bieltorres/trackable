import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function TermosPage() {
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
            <CardTitle className="text-2xl">Termos de Uso</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-3">1. Aceitação dos Termos</h3>
                <p className="text-muted-foreground">
                  Ao acessar e usar esta plataforma, você aceita e concorda em ficar vinculado aos termos e condições
                  deste acordo.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">2. Uso da Plataforma</h3>
                <p className="text-muted-foreground">
                  Esta plataforma destina-se ao acesso a conteúdos educacionais. Você concorda em usar a plataforma
                  apenas para fins legais e de acordo com estes termos.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">3. Conta do Usuário</h3>
                <p className="text-muted-foreground">
                  Você é responsável por manter a confidencialidade de sua conta e senha e por todas as atividades que
                  ocorrem em sua conta.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">4. Conteúdo</h3>
                <p className="text-muted-foreground">
                  Todo o conteúdo disponível na plataforma é protegido por direitos autorais e não pode ser reproduzido
                  sem autorização.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">5. Modificações</h3>
                <p className="text-muted-foreground">
                  Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor
                  imediatamente após a publicação.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
