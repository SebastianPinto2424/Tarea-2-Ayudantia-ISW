import { EntitySchema } from "typeorm";

const Vehiculo = new EntitySchema({
  name: "Vehiculo",
  tableName: "vehiculos",
  columns: {
    id: { primary: true, type: "int", generated: "increment" },
    marca: { type: "varchar", length: 100, nullable: false },
    modelo: { type: "varchar", length: 100, nullable: false },
    anio: { type: "int", nullable: false },
    patente: { type: "varchar", length: 20, unique: true, nullable: false },
    pilotoId: { type: "int", nullable: true },
    created_at: { type: "timestamp", createDate: true, default: () => "CURRENT_TIMESTAMP" },
    updated_at: { type: "timestamp", updateDate: true, default: () => "CURRENT_TIMESTAMP" },
  },
  relations: {
    piloto: {
      target: "Piloto",
      type: "many-to-one",
      joinColumn: { name: "pilotoId" },
      nullable: true,
      onDelete: "SET NULL",
    },
  },
});

export default Vehiculo;
