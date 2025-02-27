import React from 'react';

// Fecha de última actualización
const lastUpdated = {
  date: "27/02/2025",
  es: "Última actualización",
  en: "Last updated"
};

const ProjectStatus = () => {
  const stages = [
    { id: 1, name: 'Sprint 1', nameEn: 'Sprint 1', status: 'completed', progress: 100 },
    { id: 2, name: 'Sprint 2', nameEn: 'Sprint 2', status: 'completed', progress: 100 },
    { id: 3, name: 'Sprint 3', nameEn: 'Sprint 3', status: 'in-progress', progress: 70 },
    { id: 4, name: 'Sprint 4', nameEn: 'Sprint 4', status: 'completed', progress: 100 },
    { id: 5, name: 'Sprint 5', nameEn: 'Sprint 5', status: 'in-progress', progress: 60 },
    { id: 6, name: 'Sprint 6', nameEn: 'Sprint 6', status: 'pending' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Estado del Proyecto / Project Status</h2>
      <p className="text-center text-sm text-gray-500 italic mb-6">{lastUpdated.es}: {lastUpdated.date} / {lastUpdated.en}: {lastUpdated.date}</p>
      
      <div className="relative">
        {/* Línea de progreso */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2" />
        
        {/* Etapas */}
        <div className="relative flex justify-between">
          {stages.map((stage) => (
            <div key={stage.id} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full ${
                  stage.status === 'completed' ? 'bg-green-500' :
                  stage.status === 'current' ? 'bg-blue-500' :
                  stage.status === 'in-progress' ? 'bg-yellow-500' :
                  'bg-gray-300'
                } relative z-10 mb-2`}
              />
              <div className="text-center">
                <p className="font-medium text-sm">{stage.name}</p>
                <p className="text-xs text-gray-500">{stage.nameEn}</p>
                {stage.progress && (
                  <p className={`text-xs font-semibold ${
                    stage.status === 'completed' ? 'text-green-600' : 
                    stage.status === 'in-progress' ? 'text-yellow-600' : 
                    'text-gray-500'
                  }`}>{stage.progress}%</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leyenda */}
      <div className="mt-8 flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500" />
          <span className="text-sm">Completado / Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500" />
          <span className="text-sm">En Progreso / In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-yellow-500" />
          <span className="text-sm">Parcial / Partial</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-300" />
          <span className="text-sm">Pendiente / Pending</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatus;
