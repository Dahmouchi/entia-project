"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  BookOpen,
  IdCard,
  ChevronRight,
  ChevronLeft,
  Check,
  AlertCircle,
  School,

} from "lucide-react";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import { redirect, useRouter } from "next/navigation";

import { getClientById, updateClientProfile1, updateClientProfile2 } from "@/actions/client";
import { toast } from "react-toastify";
import Header from "@/components/Layout/Header";
import { getNiveau } from "@/actions/grads";

// Types pour les données du formulaire
interface PersonalInfo {
  nom: string;
  prenom: string;
  phone: string;
}

interface StudyInfo {
  gradeId:string;
  niveau: string;
  codeInscription: string;
}

interface FormData {
  personal: PersonalInfo;
  study: StudyInfo;
}

// Composant pour les champs de saisie
const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  required = false,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: any;
  error?: string;
  required?: boolean;
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
            error ? "border-red-500" : "border-gray-200"
          }`}
        />
      </div>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-500 text-sm"
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </motion.div>
      )}
    </div>
  );
};

// Composant pour les champs select
const SelectField = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  icon: Icon,
  error,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  icon: any;
  error?: string;
  required?: boolean;
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-white ${
            error ? "border-red-500" : "border-gray-200"
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-500 text-sm"
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </motion.div>
      )}
    </div>
  );
};

// Composant pour l'indicateur de progression
const ProgressIndicator = ({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, index) => (
        <React.Fragment key={index}>
          <motion.div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              index < currentStep
                ? "bg-green-500 text-white"
                : index === currentStep
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
          </motion.div>
          {index < totalSteps - 1 && (
            <div
              className={`w-16 h-1 mx-2 ${
                index < currentStep ? "bg-green-500" : "bg-gray-200"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Étape 1: Informations personnelles
const PersonalInfoStep = ({
  data,
  onChange,
  errors,
}: {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  errors: Partial<PersonalInfo>;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Informations Personnelles
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Nom"
          value={data.nom}
          onChange={(value) => onChange({ ...data, nom: value })}
          placeholder="Votre nom de famille"
          icon={User}
          error={errors.nom}
          required
        />

        <InputField
          label="Prénom"
          value={data.prenom}
          onChange={(value) => onChange({ ...data, prenom: value })}
          placeholder="Votre prénom"
          icon={User}
          error={errors.prenom}
          required
        />
      </div>

      <InputField
        label="Téléphone"
        type="tel"
        value={data.phone}
        onChange={(value) => onChange({ ...data, phone: value })}
        placeholder="+212 6 12 34 56 78"
        icon={Phone}
        error={errors.phone}
        required
      />

    </motion.div>
  );
};

const StudyInfoStep = ({
  data,
  onChange,
  errors,
}: {
  data: StudyInfo & { gradeId?: string }; // Add gradeId to your StudyInfo type
  onChange: (data: StudyInfo) => void;
  errors: Partial<StudyInfo>;
}) => {
  const [niveauOptions, setNiveauOptions] = useState<{
    value: string;
    label: string;
    grades?: { value: string; label: string }[];
  }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNiveaux = async () => {
      try {
        const response = await getNiveau();
        
        if (response.success) {
          const options = response.data.map((niveau: any) => ({
            value: niveau.id,
            label: niveau.name,
            grades: niveau.grades.map((grade: any) => ({
              value: grade.id,
              label: grade.name,
            })),
          }));
          setNiveauOptions(options);
        }
      } catch (error) {
        console.error("Error fetching niveaux:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNiveaux();
  }, []);

  const handleNiveauChange = (value: string) => {
    onChange({ ...data, niveau: value, gradeId: '' }); // Reset grade when niveau changes
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Informations d&apos;Étude
        </h2>
        <p className="text-gray-600">
          Parlez-nous de votre parcours académique
        </p>
      </div>

       {loading ? (
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    ) : (
      <>
        <SelectField
          label="Niveau d'étude"
          value={data.niveau}
          onChange={handleNiveauChange}
          options={niveauOptions}
          placeholder="Sélectionnez votre niveau"
          icon={BookOpen}
          error={errors.niveau}
          required
        />

        {data.niveau && (
          <SelectField
            label="Classe/Niveau spécifique"
            value={data.gradeId}
            onChange={(value) => onChange({ ...data, gradeId: value })}
            options={
              niveauOptions.find((n) => n.value === data.niveau)?.grades || []
            }
            placeholder="Sélectionnez votre classe"
            icon={School}
            error={errors.gradeId}
            required
          />
        )}
      </>
    )}

      <InputField
        label="Code d'inscription"
        value={data.codeInscription}
        onChange={(value) => onChange({ ...data, codeInscription: value })}
        placeholder="Ex: 01234567"
        icon={IdCard}
        error={errors.codeInscription}
        required
      />

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <Check className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-800 mb-1">
              Code d&apos;inscription
            </h4>
            <p className="text-sm text-blue-700">
              Insérez le code d&apos;inscription qui vous a été accordé, Merci.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Étape de confirmation
const ConfirmationStep = ({ data }: { data: FormData }) => {
  const niveauLabels: { [key: string]: string } = {
    college: "Collège",
    lycee: "Lycée",
    universite: "Université",
    master: "Master",
    doctorat: "Doctorat",
    formation: "Formation Professionnelle",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10 text-green-600" />
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Inscription Réussie !
      </h2>
      <p className="text-gray-600 mb-8">
        Félicitations ! Votre profil a été créé avec succès.
      </p>

      <div className="bg-gray-50 rounded-xl p-6 text-left max-w-md mx-auto">
        <h3 className="font-semibold text-gray-800 mb-4">
          Récapitulatif de vos informations :
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Nom complet :</span>
            <span className="font-medium">
              {data.personal.prenom} {data.personal.nom}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Téléphone :</span>
            <span className="font-medium">{data.personal.phone}</span>
          </div>
         
          <div className="flex justify-between">
            <span className="text-gray-600">Niveau :</span>
            <span className="font-medium">
              {niveauLabels[data.study.niveau] || data.study.niveau}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Code :</span>
            <span className="font-medium">{data.study.codeInscription}</span>
          </div>
        </div>
      </div>

      <motion.button
        className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => redirect("/dashboard")}
      >
        Commencer l&apos;apprentissage
      </motion.button>
    </motion.div>
  );
};

// Composant principal du formulaire multi-étapes
const MultiStepForm = () => {
  const { data: session, status,update } = useSession();
  const [currentStep, setCurrentStep] = useState(session?.user.step || 0);
  const [formData, setFormData] = useState<FormData>({
    personal: {
      nom: "",
      prenom: "",
      phone: "",
    },
    study: {
      niveau: "",
      gradeId:"",
      codeInscription: "",
    },
  });
  useEffect(() => {
    console.log(session?.user)
    const fetchUserData = async () => {
      try {
       if(session){
         const res = await getClientById(session.user.id);
        const user = res;

        if (user) {
          setFormData({
            personal: {
              nom: user.name || "",
              prenom: user.prenom || "",
              phone: user.phone?.toString() || "",
            },
            study: {
              gradeId:"",
              niveau:  "",
              codeInscription: "",
            },
          });
        }
       }
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };

    if (session?.user?.id) {
      fetchUserData();
    }
  }, [session]);
  const [errors, setErrors] = useState<{
    personal: Partial<PersonalInfo>;
    study: Partial<StudyInfo>;
  }>({
    personal: {},
    study: {},
  });
  const router = useRouter()
  // Validation des champs
  const validatePersonalInfo = (data: PersonalInfo): Partial<PersonalInfo> => {
    const errors: Partial<PersonalInfo> = {};

    if (!data.nom.trim()) errors.nom = "Le nom est requis";
    if (!data.prenom.trim()) errors.prenom = "Le prénom est requis";
    if (!data.phone.trim()) errors.phone = "Le téléphone est requis";
    else if (!/^[\+]?[0-9\s\-\(\)]{8,}$/.test(data.phone)) {
      errors.phone = "Format de téléphone invalide";
    }
    return errors;
  };

  const validateStudyInfo = (data: StudyInfo): Partial<StudyInfo> => {
    const errors: Partial<StudyInfo> = {};

    if (!data.niveau) errors.niveau = "Le niveau d'étude est requis";
    if (!data.codeInscription.trim())
      errors.codeInscription = "Le code d'inscription est requis";
    else if (data.codeInscription.length < 6) {
      errors.codeInscription = "Le code doit contenir au moins 6 caractères";
    }

    return errors;
  };

  // Navigation
const nextStep = async () => {
  if (currentStep === 0) {
    const personalErrors = validatePersonalInfo(formData.personal);
    if (Object.keys(personalErrors).length > 0) {
      setErrors((prev) => ({ ...prev, personal: personalErrors }));
      return;
    }
    setErrors((prev) => ({ ...prev, personal: {} }));
    try {
      if(session){
        const res = await updateClientProfile1(session?.user.id, formData);
       
      if (res) {
        setCurrentStep(1); // Done
      } else {
        toast.error("Failed to update profile");
      }
      }
    } catch (error) {
      console.error("Update failed", error);
      toast.error("An error occurred");
    }
    
  } else if (currentStep === 1) {
    const studyErrors = validateStudyInfo(formData.study);
    if (Object.keys(studyErrors).length > 0) {
      setErrors((prev) => ({ ...prev, study: studyErrors }));
      return;
    }
  try {
      if(session){
        const res = await updateClientProfile2(session?.user.id, formData);
       
      if (res) {
        //setCurrentStep(2); // Done
        await update({ step:2 });
        router.push("/dashboard")
      } else {
        toast.error("Failed to update profile");
      }
      }
    } catch (error) {
      console.error("Update failed", error);
      toast.error("An error occurred");
    }
    setErrors((prev) => ({ ...prev, study: {} }));
    
  }
};

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const updatePersonalInfo = (data: PersonalInfo) => {
    console.log(data);
    setFormData((prev) => ({ ...prev, personal: data }));
    // Clear errors when user types
    setErrors((prev) => ({ ...prev, personal: {} }));
  };

  const updateStudyInfo = (data: StudyInfo) => {
    setFormData((prev) => ({ ...prev, study: data }));
    // Clear errors when user types
    setErrors((prev) => ({ ...prev, study: {} }));
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800  relative"
     style={{
            backgroundImage: `url("/Board.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
      <Header visible={false}/>
      <div className="max-w-2xl mx-auto pt-32 p-2">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {currentStep < 2 && (
            <ProgressIndicator currentStep={currentStep} totalSteps={2} />
          )}

          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <PersonalInfoStep
                key="personal"
                data={formData.personal}
                onChange={updatePersonalInfo}
                errors={errors.personal}
              />
            )}

            {currentStep === 1 && (
              <StudyInfoStep
                key="study"
                data={formData.study}
                onChange={updateStudyInfo}
                errors={errors.study}
              />
            )}

            {currentStep === 2 && (
              <ConfirmationStep key="confirmation" data={formData} />
            )}
          </AnimatePresence>

          {currentStep < 2 && (
            <div className="flex justify-between mt-8">
              <motion.button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  currentStep === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                whileHover={currentStep > 0 ? { scale: 1.05 } : {}}
                whileTap={currentStep > 0 ? { scale: 0.95 } : {}}
              >
                <ChevronLeft className="w-5 h-5" />
                Précédent
              </motion.button>

              <motion.button
                onClick={nextStep}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentStep === 1 ? "Terminer" : "Suivant"}
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
