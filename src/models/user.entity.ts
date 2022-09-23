import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users", { schema: "apitest" })
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
	idUser: number;

    @Column("varchar", { name: "name", length: 50 })
	nameUser: string;

    @Column("varchar", { name: "email", length: 100 })
	emailUser: string;

    @Column("int", { name: "share" })
	sharesUser: number;

    @Column("datetime", { name: "date_register" })
	fechaUser: Date;

    @Column("int", { name: "otp" })
	otpUser: number;

    @Column("int", { name: "status" })
	statusUser: number;
}