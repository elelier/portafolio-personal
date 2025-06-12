# Funcionalidad de Botón Dinámico en ClientSpace

## Descripción
Se ha implementado un botón dinámico en el componente ClientSpace que cambia su comportamiento y apariencia según el estado de las cotizaciones del cliente.

## Comportamientos del Botón

### 🎯 **Con Cotizaciones Activas**
- **Texto**: "Proyectos Activos" (desktop) / "Proyectos" (móvil)
- **Icono**: 🟢 (círculo verde)
- **Comportamiento**: Scroll suave hacia la sección "Cotizaciones Activas"
- **Contador**: Muestra el número de cotizaciones activas

### 💬 **Sin Cotizaciones Activas**
- **Texto**: "Cotiza ahora" (desktop) / "Cotizar" (móvil)
- **Icono**: 💬 (globo de chat)
- **Comportamiento**: Abre "/contacto" en nueva pestaña
- **Estilo**: Gradiente azul con animación de pulso

## Características Implementadas

### 🎨 **Indicadores Visuales**
- **Estados Dinámicos**: El botón cambia completamente según el contexto
- **Animaciones**: Pulso suave para el estado "Cotiza ahora"
- **Iconografía Clara**: Diferentes emojis para cada estado
- **Estados Hover/Focus**: Feedback visual consistente

### ♿ **Accesibilidad**
- **Navegación por Teclado**: Funciona con las teclas Enter y Espacio
- **Atributos ARIA**: `role="button"`, `tabIndex`, y `title` dinámicos
- **Indicadores de Foco**: Outline visible para navegación por teclado
- **Mensajes Contextuales**: Tooltips descriptivos según el estado

## Implementación Técnica

### 🧠 **Lógica Condicional**
```javascript
// Función principal que maneja ambos comportamientos
const handleStatusButtonClick = () => {
  if (activeQuotes.length > 0) {
    // Si hay cotizaciones activas, hacer scroll a la sección
    scrollToActiveQuotes();
  } else {
    // Si no hay cotizaciones activas, redirigir a contacto
    window.open('/contacto', '_blank');
  }
};

// Texto dinámico basado en estado
const projectCategory =
  project?.estadoProyecto === 'terminado'
    ? 'Proyectos terminados'
    : activeQuotes.length > 0 
      ? 'Proyectos Activos'
      : 'Cotiza ahora';
```

### 🎨 **Estilos CSS**
```css
/* Estilo especial para el botón "Cotiza ahora" */
.status-badge.clickable:not(.activo):not(.terminado):not(.pausado) {
  background: linear-gradient(135deg, var(--color-primary, #3b82f6), var(--color-primary-dark, #1e40af));
  color: white;
  border-color: var(--color-primary, #3b82f6);
  animation: pulse-glow 2s infinite;
}

@keyframes pulse-glow {
  0%, 100% { 
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
  50% { 
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
  }
}
```

### 🏷️ **Marcado HTML Dinámico**
```jsx
<div 
  className={`status-badge ${project.estadoProyecto} clickable`}
  onClick={handleStatusButtonClick}
  title={activeQuotes.length > 0 ? 'Click para ir a las cotizaciones activas' : 'Click para cotizar ahora'}
>
  <span className="status-icon">{activeQuotes.length > 0 ? '🟢' : '💬'}</span>
  <span className="status-text-full">{projectCategory}</span>
  <span className="status-text-mobile">{activeQuotes.length > 0 ? 'Proyectos' : 'Cotizar'}</span>
  {activeQuotes.length > 0 && (
    <span className="status-count">{activeQuotes.length}</span>
  )}
</div>
```

## Estados del Botón

| Estado | Texto Desktop | Texto Móvil | Icono | Comportamiento | Estilo |
|--------|---------------|-------------|-------|----------------|--------|
| **Con cotizaciones** | "Proyectos Activos" | "Proyectos" | 🟢 | Scroll suave a cotizaciones | Badge normal con contador |
| **Sin cotizaciones** | "Cotiza ahora" | "Cotizar" | 💬 | Abre `/contacto` | Gradiente azul con pulso |
| **Proyecto terminado** | "Proyectos terminados" | "Proyectos" | 🟢 | Sin acción | Badge terminado |

## Archivos Modificados

### 📄 **Componentes**
- `src/components/ClientSpace.jsx`: Lógica de scroll y eventos
- `src/styles/components/ClientSpace.css`: Estilos responsivos y efectos

### 🆔 **Identificadores**
- `id="active-quotes-section"`: Añadido a la sección de cotizaciones activas

## Beneficios de UX

1. **Navegación Intuitiva**: Los usuarios pueden acceder rápidamente a las cotizaciones
2. **Feedback Visual**: Indicadores claros de interactividad
3. **Accesibilidad**: Funciona con teclado y lectores de pantalla
4. **Responsivo**: Adapta el diseño en todos los dispositivos
5. **Suave**: Animaciones fluidas mejoran la experiencia

## Pruebas Recomendadas

- ✅ Clic con ratón en el botón
- ✅ Navegación con teclado (Tab + Enter/Espacio)
- ✅ Funcionamiento en diferentes resoluciones
- ✅ Comportamiento cuando no hay cotizaciones activas
- ✅ Scroll suave considerando la barra de navegación
- ✅ Espaciado responsivo del botón "Actualizaciones nuevas"

## Mejoras de Espaciado Responsivo

### 📱 **Optimización del Botón "Actualizaciones nuevas"**
Se ha mejorado significativamente el espaciado interno y responsivo del botón para mejor legibilidad:

#### Desktop
- **Padding**: `0.9rem 2.8rem` (aumentado para mejor espaciado)
- **Gap**: `0.75rem` (separación óptima entre elementos)
- **Max-width**: `320px` (más ancho para contenido completo)
- **Margin del contador**: `1rem` (mejor separación del texto)

#### Tablet (768px)
- **Padding**: `0.7rem 1.8rem` (optimizado para pantallas medianas)
- **Gap**: `0.65rem` (separación balanceada)
- **Max-width**: `185px` (ancho apropiado)
- **Margin del contador**: `0.7rem`

#### Móvil (480px)
- **Padding**: `0.6rem 1.4rem` (compacto pero legible)
- **Gap**: `0.45rem` (separación mínima funcional)
- **Max-width**: `155px` (optimizado para móvil)
- **Margin del contador**: `0.6rem`

### 🎯 **Mejoras Implementadas**
1. **Padding interno aumentado** en todas las resoluciones
2. **Gap específico** para mejor separación entre icono, texto y contador
3. **Margins optimizados** para el contador de notificaciones
4. **Anchos responsivos** que se adaptan al contenido
5. **Alturas mínimas** consistentes entre botones

---

**Fecha de implementación**: 12 de junio de 2025  
**Versión**: 1.0.0  
**Estado**: ✅ Completo y funcional
