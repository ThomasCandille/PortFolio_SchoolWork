import React from "react";

export default function StudentTestimonial() {
    return (
        <section className="container mx-auto px-4 py-16 bg-white">
            <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Témoignages d'Anciens Étudiants</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-12"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                        <div>
                            <h4 className="font-semibold text-gray-800">Sophie Martin</h4>
                            <p className="text-sm text-gray-600">Promotion 2022</p>
                        </div>
                    </div>
                    <p className="text-gray-700 italic">"Cette formation m'a permis d'acquérir des compétences techniques solides qui m'ont ouvert de nombreuses portes dans le secteur du numérique."</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                        <div>
                            <h4 className="font-semibold text-gray-800">Thomas Dubois</h4>
                            <p className="text-sm text-gray-600">Promotion 2021</p>
                        </div>
                    </div>
                    <p className="text-gray-700 italic">"Les projets concrets réalisés pendant mon cursus m'ont donné une expérience pratique inestimable et un portfolio qui a impressionné mes employeurs."</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                        <div>
                            <h4 className="font-semibold text-gray-800">Emma Lefèvre</h4>
                            <p className="text-sm text-gray-600">Promotion 2023</p>
                        </div>
                    </div>
                    <p className="text-gray-700 italic">"L'accompagnement personnalisé et la qualité des enseignements m'ont permis de me spécialiser dans un domaine qui me passionne et de trouver rapidement un emploi."</p>
                </div>
            </div>
        </section>
    );
}