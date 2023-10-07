import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export default async function Home() {
  const contacts = await prisma.contact.findMany()

  const addUser = async(formData) => {
    'use server'

    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const email = formData.get('email')
    const user = {firstName: firstName, lastName: lastName, email: email}

    await prisma.contact.create({data: user})

    revalidatePath('/')
  }

  return (
  <main>
    <h3 className=' text-2xl font-bold'>Hello Customer!</h3>
    <form action={addUser} className="flex flex-col justify-center mx-auto">
        <input className="input input-bordered" type="text" name="firstName" placeholder="First Name"/>
        <input className="input input-bordered" type="text" name="lastName" placeholder="Last Name"/>
        <input className="input input-bordered" type="email" name="email" placeholder="Email"/>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    <div className="mt-8 flex flex-col gap-2">
      {contacts.map(contact => (
        <div >
          <h3>{contact.firstName} {contact.lastName}</h3>
          <p className=" italic font-light">{contact.email}</p>
        </div>
      ))}
    </div>
  </main>
  )
}
