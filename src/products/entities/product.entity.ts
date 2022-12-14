import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  title: string;

  @Column('float', { default: 0 })
  price: number;

  @Column('text', { nullable: true })
  description: string;

  @Column({
    type: 'text',
    unique: true,
  })
  slug: string;

  @Column('int', { default: 0 })
  stock: number;

  @Column('text', { array: true })
  sizes: string;

  @Column('text')
  gender: string;

  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
  })
  images?: ProductImage[];

  
  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title
        .toLocaleLowerCase()
        .replace(' ', '_')
        .replace("'", ' ');
    } else {
      this.slug = this.slug
        .toLocaleLowerCase()
        .replace(' ', '_')
        .replace("'", '');
    }
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    if (!this.slug) {
      this.slug = this.title
        .toLocaleLowerCase()
        .replace(' ', '_')
        .replace("'", ' ');
    } else {
      this.slug = this.slug
        .toLocaleLowerCase()
        .replace(' ', '_')
        .replace("'", '');
    }
  }
}
