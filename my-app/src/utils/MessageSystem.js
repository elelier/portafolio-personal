class Message {
  constructor(type, content) {
    this.type = type;
    this.content = content;
    this.timestamp = new Date();
  }
}

class SystemMessage extends Message {
  constructor(content) {
    super('system', content);
  }

  static createTypingMessage(text) {
    return new SystemMessage({ isTyping: true, text });
  }

  static createRedirectMessage(language, section) {
    const sectionName = language === 'es' ? {
      'about': 'Acerca de Mí',
      'projects': 'Proyectos',
      'skills': 'Habilidades',
      'contact': 'Contacto'
    }[section] : {
      'about': 'About Me',
      'projects': 'Projects',
      'skills': 'Skills',
      'contact': 'Contact'
    }[section];

    const message = language === 'es'
      ? `✨Ahora estás en la sección <b>${sectionName}</b><div style="margin: 8px 0"></div><div class="message-list"><div class="message-item">❌Puedes cerrar esta ventana haciendo clic en X, aquí o en cualquier lugar fuera de la ventana</div></div>`
      : `✨You are now on the <b>${sectionName}</b> section<div style="margin: 8px 0"></div><div class="message-list"><div class="message-item">❌You can close this window by clicking X, here or anywhere outside</div></div>`;

    return new SystemMessage(message);
  }

  static createBenefitsMessage(language, benefits) {
    return new SystemMessage(
      `<div class="message-list"><h4>${language === 'es' ? 'Potencia tu negocio con:' : 'Boost your business with:'}</h4><div class="message-grid">${benefits.map(benefit => `<button class="message-item" onclick="window.handleBenefitClick('${benefit.text}')">${benefit.icon}${benefit.text}</button>`).join('')}</div></div>`
    );
  }

  static createBenefitPointsMessage(language, points) {
    const pointsHtml = points.map(point => 
      `<button class="message-item">${point.icon}${point.text.trim()}</button>`
    ).join('');
    
    return new SystemMessage(
      `<div class="message-list">${pointsHtml}</div>`
    );
  }
}

class UserMessage extends Message {
  constructor(content) {
    super('user', content);
  }
}

export { Message, SystemMessage, UserMessage };
