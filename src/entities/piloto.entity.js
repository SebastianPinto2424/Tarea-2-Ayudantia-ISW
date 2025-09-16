import { EntitySchema } from "typeorm";

const Piloto = new EntitySchema({
  name: "Piloto",
  tableName: "pilotos",
  columns: {
    id: { primary: true, type: "int", generated: "increment" },
    nombre: { type: "varchar", length: 100, nullable: false },
    apellido: { type: "varchar", length: 100, nullable: false },
    licencia: { type: "varchar", length: 50, unique: true, nullable: false },
    estado_activo: { type: "bool", default: true },
    created_at: { type: "timestamp", createDate: true, default: () => "CURRENT_TIMESTAMP" },
    updated_at: { type: "timestamp", updateDate: true, default: () => "CURRENT_TIMESTAMP" },
  },
});

export default Piloto;
