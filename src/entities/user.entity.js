

import { EntitySchema } from "typeorm";

const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: { primary: true, type: "int", generated: "increment" },
    nombre: { type: "varchar", length: 100, nullable: true },
    apellido: { type: "varchar", length: 100, nullable: true },
    email: { type: "varchar", length: 255, unique: true, nullable: false },
    password: { type: "varchar", length: 255, nullable: false },
    rol: { type: "varchar", length: 30, nullable: true },
    estado_activo: { type: "bool", default: true },
    fecha_registro: { type: "timestamp", default: () => "CURRENT_TIMESTAMP" },
    created_at: { type: "timestamp", createDate: true, default: () => "CURRENT_TIMESTAMP" },
    updated_at: { type: "timestamp", updateDate: true, default: () => "CURRENT_TIMESTAMP" },
  },
});

export default User;

