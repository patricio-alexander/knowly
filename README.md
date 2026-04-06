# Documentación

## Objetivo

Desarrollar una aplicación multiplataforma con React Native, Expo, Supabase y PostgreSQL, con la finalidad de ofrecer un software enfocada a mejorar la experiencia de aprendizaje de los estudiantes.

## Arquitectura de la app y buenas prácticas

La aplicación sigue un enfoque de Feature-Driven Architecture (FDA), organizandolo al código por funcionales en lugar por tipo (components, services, etc). Esto permite separar cada módulo y facilita la escabilidad del proyecto a medidad que se requieran nuevas features/funcionalidades, de manera que cada feature encapsula su propia lógica, componentes y acceso de datos.

Adicionalmente, se aplican principios inspirados de diseño en SOLID, especialmente:

- **Single Responsibility Principle (SRP)**: Separación de lógica en capas independientes, UI unicamente presentación, los uses cases contienen la lógica de negocio, y los servicios que gestionan el acceso a los datos a traves de Supabase

**Ejemplo de arquitectura FDA:**

```
src/
├── app/            # Expo router y layouts
├── components/     # Componentes compartidos para todo el proyecto
├── features/       # Feature modules
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   ├── posts/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   └── shared/     # Códico compartido entre las features
├── lib/
└── types/          # Tipado Globales
```

### Stack

![supabase](https://img.shields.io/badge/supabase-black?style=for-the-badge&logo=supabase)
![reactnative](https://img.shields.io/badge/react%20native-black?style=for-the-badge&logo=react)
![typescript](https://img.shields.io/badge/typescript-black?style=for-the-badge&logo=typescript)
![postgresql](https://img.shields.io/badge/postgresql-black?style=for-the-badge&logo=PostgreSQL&logoColor=blue)
![expo](https://img.shields.io/badge/expo-black?style=for-the-badge&logo=expo&logoColor=white)

## Features de la app

- Convertir un archivo de audio a puntos clave, resumen detallado o transcripción completa
- Convertir un archivo PDF a un cuestionario, que se puede establecer dificultad y número de preguntas
- Convertir apuntes ya sea en texto o foto a mapa mental, esquema o flashcards
