"use client";
import NavBar from "@/components/navbar";
import { useUser } from "@clerk/nextjs";
import { Spin } from "antd";
import { Loader2 } from "lucide-react";
import "./globals.css";

export default function Home() {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <>
        <div className="h-screen w-screen flex justify-center items-center">
          <Spin
            indicator={
              <Loader2
                color="#000000"
                strokeWidth={2}
                style={{ fontSize: 50 }}
                className="animate-spin"
              />
            }
          />
        </div>
      </>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="p-4 h-10">
        <div className="lg:w-2/3 mx-auto">
          <h1 className="flex flex-col text-center text-gray-900 font-bold text-5xl md:text-6xl xl:text-7xl">
            The Cube:
            <span className="text-primary">Cloud</span>
          </h1>
          <p className="mt-8 text-gray-700">
            Découvrez notre nouveau projet de site de cloud, conçu pour
            simplifier la gestion et le stockage de vos données en ligne. Notre
            plateforme offre une solution complète et conviviale pour stocker et
            accéder à vos fichiers en tout temps, où que vous soyez.
          </p>
          <p className="mt-2 text-gray-700">
            Avec notre interface intuitive, vous pouvez facilement télécharger
            et organiser vos fichiers dans le cloud en quelques clics. Que ce
            soit pour sauvegarder des documents importants, notre site de cloud
            vous offre les outils nécessaires pour répondre à vos besoins.
          </p>
          <p className="mt-2 text-gray-700">
            De plus, notre projet est conçu pour être facile à intégrer dans
            votre quotidien. Que vous soyez un utilisateur individuel cherchant
            à simplifier la gestion de ses fichiers ou une entreprise désireuse
            de mettre en place un système de stockage sécurisé pour ses données,
            notre site de cloud offre une solution flexible et évolutive pour
            répondre à vos besoins.
          </p>
          <p className="mt-2 text-gray-700">
            Dites adieu aux tracas de stockage de données et découvrez une
            nouvelle façon simple et efficace de gérer vos fichiers en ligne
            avec notre projet de site de cloud.
          </p>
          <div className="mt-16 flex flex-wrap justify-end gap-y-4 gap-x-6 pb-4 ">
            <a
              href="/dashboard"
              className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-3xl before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            >
              <span className="relative text-base font-semibold text-white">
                Get started free
              </span>
            </a>
            <a
              href="#"
              className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-3xl before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            >
              <span className="relative text-base font-semibold text-primary">
                Learn more +
              </span>
            </a>
          </div>
          <div className="py-8 mt-16 border-y border-gray-300 bg-gray-100  flex justify-between flex-col md:flex-row gap-5 items-center px-5">
            <div className="text-left">
              <h6 className="text-lg font-semibold text-gray-700">
                Stockage Illimité
              </h6>
            </div>
            <div className="text-left">
              <h6 className="text-lg font-semibold text-gray-700 ">
                Impotation Illimité
              </h6>
            </div>
            <div className="text-left">
              <h6 className="text-lg font-semibold text-gray-700 ">
                Limites d'Importation 100Go
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
