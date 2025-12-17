// src/components/UpdateProfileForm.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { updateUserInfo } from "@/actions/student";

export function UpdateProfileForm({
  userId,
  initialData,
}: {
  userId: string;
  initialData: any;
}) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    prenom: initialData.prenom || "",
    phone: initialData.phone || "",
    location: initialData.location || "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setMessage("");

    try {
      const result = await updateUserInfo(userId, formData);

      if (result.success) {
        setIsSuccess(true);
        setMessage(result.message);
      } else {
        setIsSuccess(false);
        setMessage(result.message);
        if (result.errors) {
          setErrors(result.errors);
        }
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* --- Name (Nom) --- */}
      <div className="space-y-2">
        <Label htmlFor="name">Nom</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.join(", ")}</p>
        )}
      </div>

      {/* --- Prenom (Prénom) --- */}
      <div className="space-y-2">
        <Label htmlFor="prenom">Prénom</Label>
        <Input
          id="prenom"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        {errors.prenom && (
          <p className="text-sm text-red-500">{errors.prenom.join(", ")}</p>
        )}
      </div>

      {/* --- Phone (Téléphone) --- */}
      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.join(", ")}</p>
        )}
      </div>

      {/* --- Location (Localisation) --- */}
      <div className="space-y-2">
        <Label htmlFor="location">Localisation</Label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        {errors.location && (
          <p className="text-sm text-red-500">{errors.location.join(", ")}</p>
        )}
      </div>

      {/* Status Message */}
      {message && (
        <p
          className={`text-sm ${isSuccess ? "text-green-600" : "text-red-600"}`}
        >
          {message}
        </p>
      )}

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Sauvegarde..." : "Sauvegarder les modifications"}
      </Button>
    </form>
  );
}
