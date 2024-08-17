"use client";

import Column from "@/components/Column";
import EMLogo from "@/components/EMLogo";
import Page from "@/components/Page";
import Text from "@/components/Text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserType } from "@/contexts/AuthContext";
import useAuth from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { Teacher, User } from "@/types";
import { Axios } from "@/lib/axios";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type AuthProps = Pick<Teacher, "teacher_id"> & Pick<User, "password">;

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const userRole = useUserRole();
  const auth = useAuth();
  const [user, setUser] = useState<AuthProps & { role: string }>({
    teacher_id: -1,
    password: "",
    role: "",
  });
  const roles = ["Author", "Reviewer", "Editor"];
  const [rolesOpen, setRolesOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [loggingIn, setLoggingIn] = useState(false);
  const handleLogin = async () => {
    try {
      setLoggingIn(true);
      const data: UserType & { message: string } = (
        await Axios.post("/login/teacher", {
          teacher_id: user.teacher_id,
          password: user.password,
        })
      ).data;

      const role: {
        isAuthor: boolean;
        isEditor: boolean;
        isReviewer: boolean;
      } = (
        await Axios.get(
          `/editorial-manager/role?user_id=${data.user.user_id}&isAuthor=true&isReviewer=true&isEditor=true`
        )
      ).data;
      if (
        (user.role === "Author" && !role.isAuthor) ||
        (user.role === "Editor" && !role.isEditor) ||
        (user.role === "Reviewer" && !role.isReviewer)
      ) {
        setError("Invalid Role");
        setTimeout(() => {
          setError("");
        }, 5000);
        return;
      }

      setLoggingIn(false);
      auth?.setUser(data.user);
      userRole?.setRole(user.role);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("session_id", data.session_id);
      localStorage.setItem("role", user.role.toLowerCase());
      router.replace(`/${user.role.toLowerCase()}/dashboard`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (localStorage.getItem("session_id") && role) {
      router.replace(`/${role}/dashboard`);
    } else {
      setLoading(false);
    }
  }, [userRole, router]);

  if (loading) {
    return (
      <Page className="items-center justify-center gap-4 flex-1">
        <Loader2 className="mr-2 h-10 w-10 animate-spin stroke-primary" />
      </Page>
    );
  }

  return (
    <Page className="items-center justify-center gap-4 flex flex-col">
      <EMLogo size={40} variant="long" onClick={() => router.push("/")} />
      <Text className="text-2xl font-medium">Login</Text>
      <form className="w-[400px] flex flex-col">
        <Label htmlFor="teacher_id">Teacher ID</Label>
        <Input
          className="mb-4 mt-2 focus-within:border-primary"
          id="teacher_id"
          placeholder="enter your id"
          minLength={4}
          pattern="[1-9]+\d*"
          value={user.teacher_id === -1 ? "" : user.teacher_id?.toString()}
          onChange={(e) =>
            setUser((prev) => ({
              ...prev,
              teacher_id: Number.parseInt(e.target.value),
            }))
          }
        />
        <Label htmlFor="password">Password</Label>
        <Input
          className="my-2 focus-within:border-primary"
          id="password"
          placeholder="enter your password"
          type="password"
          value={user.password}
          onChange={(e) =>
            setUser((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />

        <Link href="#" className="mb-4 text-sm text-primary">
          Forgot password?
        </Link>

        <div className="mb-4 w-full">
          <Popover open={rolesOpen} onOpenChange={setRolesOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={rolesOpen}
                className="w-full justify-between"
              >
                {user.role.length > 0 ? user.role : "Select role"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col w-[400px] p-1">
              {roles.map((role, index) => {
                return (
                  <Button
                    variant="ghost"
                    key={index}
                    onClick={() => {
                      setUser((prev) => ({ ...prev, role }));
                      setRolesOpen(false);
                    }}
                    className="justify-start rounded-sm"
                  >
                    <Check
                      size={16}
                      className={
                        "mr-2 h-4 w-4 " +
                        (role === user.role ? "opacity-100" : "opacity-0")
                      }
                    />
                    {role}
                  </Button>
                );
              })}
            </PopoverContent>
          </Popover>
        </div>

        <Button
          variant="default"
          size="lg"
          onClick={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          {loggingIn ? (
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          ) : (
            "Login"
          )}
        </Button>
        {error.length > 0 ? <Text>{error}</Text> : null}
      </form>
    </Page>
  );
}
