import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default async function Shopping() {

  return (
    <div className="flex flex-col gap-3">
      <h1>Añade elementos:</h1>
      <form action={""} className="gap-3 flex">
        <Input placeholder="Ingrediente" />
        <Button>Guardar</Button>
      </form>
      <h1>Lista de la compra:</h1>
    </div>
  )
}