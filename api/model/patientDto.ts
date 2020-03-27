/**
 * Covid19 Tests API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 3
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { AddressDto } from './addressDto';

export interface PatientDto { 
    occupationGroup?: string;
    firstname?: string;
    lastname?: string;
    bday?: string;
    address?: AddressDto;
    phoneNumber?: string;
    healthCareOrganisationNumber?: string;
    personalHealthCareNumber?: string;
    insuranceType?: string;
    mobile?: boolean;
}