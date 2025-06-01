import React from "react";

export default function HeadSection() {
    return (
        <section className="bg-white py-16 border-b">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Projets Étudiants</h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-600">Portfolio de Projets Numériques</p>
                <div className="max-w-3xl mx-auto">
                    <p className="mb-6 text-gray-700">
                        Découvrez des projets innovants créés par des étudiants talentueux de notre filière numérique.
                        Du développement web au design, explorez les compétences variées et les solutions créatives
                        développées tout au long de leur parcours académique.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="bg-orange-500 text-white px-6 py-2 rounded-md font-medium hover:bg-orange-600 transition shadow-sm">
                            Parcourir les Projets
                        </button>
                        <button className="border-2 border-orange-500 text-orange-500 px-6 py-2 rounded-md font-medium hover:bg-orange-500 hover:text-white transition">
                            À Propos de la Formation
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}