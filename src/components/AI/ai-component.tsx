"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { ArrowUp, Check, Clipboard, Copy, Send } from "lucide-react";

const FormSchema = z.object({
  Prompt: z.string().min(1, {
    message: "Prompt must be at least 1 character.",
  }),
});

const AllspaceAI = () => {
  const gemini_key = "AIzaSyAiM1cD1iWvOf8vc7AVmqYc0ndYPHXxdZ8";
  const [response, setResponse] = useState("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Prompt: "",
    },
  });
  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(response)
      .then(() => {
        toast({
          title: "Successfully copied to clipboard",
          description: "Response Copied",
        });
        // Optionally, you can provide feedback to the user here
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
        // Handle error
      });
  };
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(gemini_key);
    async function run() {
      // For text-only input, use the gemini-pro model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = JSON.stringify(data);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResponse(response.text());
    }
    run();
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4 mt-[20px]"
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="Prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ask AI✨</FormLabel>
                <FormControl>
                  <Input placeholder="Ask anything.." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center items-center gap-2">
            <Button type="submit" className="w-full">
              <ArrowUp />
              Submit
            </Button>

            <Button variant="secondary" onClick={handleCopyToClipboard}>
              <Clipboard size={20} />
            </Button>
          </div>
          <Textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="h-[250px] resize-none"
            readOnly
          />
        </form>
      </Form>
    </>
  );
};

export default AllspaceAI;
