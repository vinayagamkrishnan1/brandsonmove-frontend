import { gql } from "@apollo/client";

export const INSERT_ONE = (entity: string) =>
    gql`mutation insert_${entity}_one($object: ${entity}_insert_input!) { object: insert_${entity}_one(object: $object) { id } }`;

export const INSERT_MANY = (entity: string) =>
    gql`mutation insert_${entity}($objects: [${entity}_insert_input!]!) { objects: insert_${entity}(objects: $objects) { affected_rows } }`;

export const UPSERT_ONE = (entity: string, key: string, columns: string) =>
    gql`mutation insert_${entity}_one($object: ${entity}_insert_input!) { object: insert_${entity}_one(object: $object, on_conflict: {constraint: ${key}, update_columns: [${columns}]}) { id } }`;

export const UPSERT_MANY = (entity: string, key: string, columns: string) =>
    gql`mutation insert_${entity}($objects: [${entity}_insert_input!]!) { objects: insert_${entity}(objects: $objects, on_conflict: {constraint: ${key}, update_columns: [${columns}]}) { affected_rows } }`;

export const UPDATE_ONE = (entity: string) =>
    gql`mutation update_${entity}_by_pk($id: uuid!, $object: ${entity}_set_input) { object: update_${entity}_by_pk(pk_columns: {id : $id}, _set: $object) { id } }`;

export const UPDATE_ONE_STR_ID = (entity: string) =>
    gql`mutation update_${entity}_by_pk($id: String!, $object: ${entity}_set_input) { object: update_${entity}_by_pk(pk_columns: {id : $id}, _set: $object) { id } }`;

export const UPDATE_MANY = (entity: string) =>
    gql`mutation update_${entity}($where: ${entity}_bool_exp!, $object: ${entity}_set_input) { objects: update_${entity}(where: $where, _set: $object) { affected_rows } }`;

export const DELETE_ONE = (entity: string) => gql`mutation delete_${entity}_by_pk($id: uuid!) { object: delete_${entity}_by_pk(id : $id) { id } }`;
export const DELETE_MANY = (entity: string) =>
    gql`mutation delete_${entity}($where: ${entity}_bool_exp!) { object: delete_${entity}(where : $where) { affected_rows } }`;
