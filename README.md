# ♻️ ZIRAKO - Plataforma de Economía Circular

**ZIRAKO** es una plataforma web diseñada para el Valle del Cauca, Colombia, que conecta a ciudadanos y empresas para extender el ciclo de vida de los productos y gestionar residuos de manera responsable. La aplicación facilita la compra, venta, donación, intercambio y recolección de artículos, integrando métricas de impacto ambiental.

---

## Características Principales

###  Mercado y Gestión de Artículos
- **Publicación:** Los usuarios pueden publicar artículos con fotos, descripción y ubicación.
- **Tipos de Transacción:** Venta, Donación o Intercambio.
- **Búsqueda Avanzada:** Buscador inteligente por nombre, descripción o categoría, excluyendo los artículos propios.
- **Novedades:** Sección dinámica que muestra los últimos artículos publicados por la comunidad.

### 2. istema de Intercambio (Trueque)
- Flujo completo de negociación:
  1. El usuario selecciona un artículo de interés.
  2. El sistema le permite elegir uno de **sus propios artículos** para ofrecer a cambio.
  3. Se envía una propuesta formal.
  4. El dueño acepta o rechaza la oferta desde su panel.

### 3. Logística de Recolección
- **Usuarios Generadores:** Agendan recolecciones de material (plástico, vidrio, RAEE) seleccionando fecha, hora y empresa recolectora.
- **Empresas Recolectoras:** Tienen un panel exclusivo donde visualizan las órdenes asignadas y gestionan su estado (Pendiente → En Camino → Completada).

### 4. Gamificación e Impacto
- **Métricas:** Cálculo automático de CO₂ ahorrado por cada acción.
- **Niveles:** Sistema de puntos que otorga rangos (Bronce, Plata, Oro, Diamante) según la actividad del usuario.

### 5. Comunicación y Soporte
- **Notificaciones:** Envío de correos electrónicos transaccionales (SMTP) para confirmaciones de recolección, tickets de soporte y alertas de compra.
- **Tickets:** Sistema interno de PQRS con generación de códigos únicos (`ZRK-XXXX`).

--

## 👥 Roles de Usuario y Credenciales de Prueba

El sistema maneja roles diferenciados con interfaces adaptadas:

| Rol | Descripción | Permisos |
| :--- | :--- | :--- |
| **Persona / Empresa** | Usuario estándar | Publicar, comprar, donar, intercambiar y solicitar recolección. |
| **Empresa Recolectora** | Rol logístico | **NO** puede solicitar recolección. Su dashboard muestra las órdenes asignadas para ejecutar. |

###  Usuarios Demo
Para probar el flujo completo, utiliza estas cuentas ya configuradas:

####  Usuario Estándar (Persona)
* **Email:** `yeraldin.atehortua98@gmail.com`
* **Contraseña:** `Test123*`
* *Prueba:* Publicar un artículo, solicitar una donación, agendar una recolección.

#### Empresa Recolectora
* **Email:** `elsagiraldo29@gmail.com`
* **Contraseña:** `Test123*`
* *Prueba:* Ir a la sección "Recolección" y ver las órdenes que le han asignado otros usuarios.

---

## Stack Tecnológico

* **Frontend Framework:** [Next.js 16](https://nextjs.org/) (App Router).
* **Lenguaje:** TypeScript / React 19.
* **Estilos:** Tailwind CSS + Shadcn UI + Lucide React.
* **Base de Datos:** MySQL (Alojada en Railway).
* **Autenticación:** Sistema propio con JWT (JSON Web Tokens) y Bcrypt.
* **Email:** Nodemailer (Integración SMTP).
* **Imágenes:** Cloudinary (Gestión de subida de fotos).

---
## Servidor de prueba
https://zirako-2-0.vercel.app/auth/login

---
## 📄 Licencia
Este proyecto es de uso educativo y demostrativo.
