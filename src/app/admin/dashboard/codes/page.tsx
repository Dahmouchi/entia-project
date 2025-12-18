// app/dashboard/blogs/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Plus } from "lucide-react";
import { createBlog, deleteBlog, getBlogs, updateBlog } from "@/actions/code";
import { RegisterCode } from "@prisma/client";
import { toast } from "react-toastify";
import Loading from "@/components/Loading";

import { Button } from "@/components/ui/button";
import { columns } from "../../_components/tour-data-table/columns";
import { DataTable } from "../../_components/tour-data-table/data-table";
import { Shell } from "@/components/shells/shell";
const formSchema = z.object({
  title: z.string().min(1, "Code is required"),
  numberOfCodes: z.number().min(1).max(100, "Maximum 100 codes at once"),
});

export default function BlogManagementPage() {
  const [blogs, setBlogs] = useState<RegisterCode[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<RegisterCode | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      title: "",
      numberOfCodes: 1,
    },
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs();
        setBlogs(response);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateRandomCode = (): string => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  // Function to generate multiple codes
  const generateMultipleCodes = (count: number): string[] => {
    const codes = new Set<string>();
    while (codes.size < count) {
      codes.add(generateRandomCode());
    }
    return Array.from(codes);
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (currentBlog) {
        // Handle single code update
        const formData = new FormData();
        formData.append("title", values.title);
        await updateBlog(currentBlog.id, formData);
        toast.success("Code updated successfully");
      } else {
        // Handle multiple code creation
        const codesToCreate = generateMultipleCodes(values.numberOfCodes);

        // Create all codes (you'll need to implement batch creation in your API)
        const creationPromises = codesToCreate.map((code) => {
          const formData = new FormData();
          formData.append("title", code);
          return createBlog(formData);
        });

        await Promise.all(creationPromises);
        toast.success(`Successfully created ${values.numberOfCodes} codes`);
      }

      // Refresh blogs list
      const response = await getBlogs();
      setBlogs(response);
      setIsDialogOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error saving codes:", error);
      toast.error("An error occurred while saving codes");
    }
  };

  const openCreateDialog = () => {
    setCurrentBlog(null);
    form.reset({
      title: "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        {/* Header with search and add button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold">Gestion des Codes</h1>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openCreateDialog}>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un code
                </Button>
              </DialogTrigger>
              <DialogContent className="">
                <DialogHeader>
                  <DialogTitle>
                    {currentBlog ? "Edit Code" : "Créer un nouveau code"}
                  </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 gap-4">
                      {currentBlog ? (
                        // Edit mode - show single code field
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Code</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter code" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        // Create mode - show number of codes to generate
                        <>
                          <div className="flex items-end gap-2 ">
                            <FormField
                              control={form.control}
                              name="numberOfCodes"
                              render={({ field }) => (
                                <FormItem className="w-full">
                                  <FormLabel>
                                    Nombre de codes à générer
                                  </FormLabel>
                                  <FormControl className="w-full">
                                    <Input
                                      type="number"
                                      className="w-full"
                                      min="1"
                                      max="100"
                                      placeholder="1-100"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          parseInt(e.target.value) || 1
                                        )
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit">
                              {currentBlog ? "Update" : "Générer des codes"}
                            </Button>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Blog List */}
        {isLoading ? (
          <Loading />
        ) : filteredBlogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">
              {searchTerm ? "No matching blogs found" : "No blogs available"}
            </p>
            {!searchTerm && (
              <Button onClick={openCreateDialog} className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Créez votre premier code
              </Button>
            )}
          </div>
        ) : (
          <ScrollArea className="w-full rounded-md border">
            <Shell className="p-0 sm:p-4">
              <DataTable data={blogs || []} columns={columns} />
            </Shell>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
