import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from 'typeorm';

@Entity()
@Tree("closure-table")
export class Photo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    title!: string;
    
    @TreeParent()
    parent?: Photo | null;
    @Column({ nullable: true })
    parentId?: number | null;
    @TreeChildren()
    children?: Photo[] | null;
    
    constructor(init: Partial<Photo>) {        
        super();
        Object.assign(this, init);
    }
}