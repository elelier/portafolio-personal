import React from 'react';

const ProjectStatus = () => {
  const stages = [
    { id: 1, name: 'Propuesta', nameEn: 'Proposal', status: 'completed' },
    { id: 2, name: 'Prototipo', nameEn: 'Prototype', status: 'current' },
    { id: 3, name: 'Avance 1', nameEn: 'Progress 1', status: 'pending' },
    { id: 4, name: 'Avance 2', nameEn: 'Progress 2', status: 'pending' },
    { id: 5, name: 'Entrega', nameEn: 'Delivery', status: 'pending' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Estado del Proyecto / Project Status</h2>
      
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
                  'bg-gray-300'
                } relative z-10 mb-2`}
              />
              <div className="text-center">
                <p className="font-medium text-sm">{stage.name}</p>
                <p className="text-xs text-gray-500">{stage.nameEn}</p>
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
          <div className="w-4 h-4 rounded-full bg-gray-300" />
          <span className="text-sm">Pendiente / Pending</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatus;
