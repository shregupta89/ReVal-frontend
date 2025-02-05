"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {  useState } from "react"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@radix-ui/react-toast"
// import { UserContext } from "@/context/UserContext"
import { useRouter } from "next/router"
import Link from "next/link";
export function LoginForm({
  className,
  ...props
}) {

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const {toast} = useToast()
  const router = useRouter()
  const {setEmail,setFirstname,setLastname} = useContext(UserContext)

  const submitForm = async(e)=>{
    e.preventDefault()
    if(!username || !password){
      return
    }
    try {
          const response = await axios.post('/api/signin',{username,password})
          if(response.data.error){
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: response.data.error,
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            return
          }
          setEmail(response.data.username)
          setFirstname(response.data.firstname)
          setLastname(response.data.lastname)

          router.push('/dashboard')
    } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.response.data.error,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
    }

  }

  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={(e)=>submitForm(e)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input onChange={(e)=>setUsername(e.target.value)} id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input onChange={(e)=>setPassword(e.target.value)} id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="#" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/MountainMan.png"
              alt="Image"
              className="absolute inset-0 h-52 w-44 object-cover dark:brightness-[0.2] dark:grayscale" />
            <img
              src="/illustration.png"
              alt="Image"
              className="absolute inset-0 h-44 w-48 object-cover dark:brightness-[0.2] dark:grayscale self-center justify-self-end " />
            <img
              src="/raining_money.png"
              alt="Image"
              className="absolute inset-0 h-52 w-52 object-cover dark:brightness-[0.2] dark:grayscale self-end" />
          </div>
        </CardContent>
      </Card>
      <div
        className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <Link href="#">Terms of Service</Link>{" "}
        and <Link href="#">Privacy Policy</Link>.
      </div>
    </div>)
  );
}
