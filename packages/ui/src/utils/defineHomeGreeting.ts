export const defineHomeGreeting = (): string => {
  const currentHour = new Date().getHours();

  const greetings = [
    { range: [5, 12], message: 'Bom Dia' },
    { range: [12, 18], message: 'Boa Tarde' },
    { range: [18, 24], message: 'Boa Noite' },
    { range: [0, 5], message: 'Boa Noite' }
  ];

  const greeting = greetings.find(({ range }) => currentHour >= range[0] && currentHour < range[1]);

  return greeting ? greeting.message : 'Olá';
};