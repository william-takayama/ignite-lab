import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/icons/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";

export function Subscribe() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate()
  const [createSubscriber, { loading }] = useCreateSubscriberMutation()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // create with DRAFT stage
    await createSubscriber({ variables: { name, email } })

    navigate('/event')
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <Logo />

          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Develop a <strong className="text-blue-500">whole application from scratch</strong> with <strong>React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            In just one week you'll understand one of the best technologies at the moment.
          </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">Subscribe for free</strong>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
            <input
              className="bg-gray-900 rounded px-5 h-14"
              type="text"
              placeholder="Full name"
              onChange={e => { setName(e.target.value) }}
            />
            <input
              className="bg-gray-900 rounded px-5 h-14"
              type="email"
              placeholder="Enter your email"
              onChange={e => { setEmail(e.target.value) }}
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Guarantee your spot
            </button>
          </form>
        </div>
      </div>

      <img src="/src/assets/code-mockup.png" alt="" />
    </div>
  )
}
