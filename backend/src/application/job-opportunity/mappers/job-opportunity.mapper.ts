import { raw } from 'express'
import { read } from 'fs'
import { t } from 'i18next'
import { JobOpportunitty } from '../domain/job-opportunity'

export class JobOpportunittyMapper {
  static toDomain(raw: PersistenceJobOpportunitty) {
    const JobOpportunittyOrError = JobOpportunitty.create(
      {
        office: raw.office,
        requirements: raw.requirements,
        hours: raw.hours,
        wage: raw.wage,
        name: raw.name,
        age: raw.age,
        maritalStatus: raw.maritalStatus,
        nationality: raw.nationality,
        email: raw.email,
        phone: raw.phone,
        address: raw.address,
        academicEducation: raw.academicEducation,
        intendedSalary: raw.intendedSalary,
        desiredJobTitle: raw.desiredJobTitle,
        companyName: raw.companyName,
        positionHeld: raw.positionHeld,
        companyContact: raw.companyContact,
      },
      raw.id,
    )

    if (jobOpportunittyOrError.isLeft()) {
      throw new Error(t('errors.invalid_Photographer'))
    }

    return jobOpportunittyOrError.value
  }

  static async toPersistence(jobOpportunitty: JobOpportunitty) {
    return {
      id: jobOpportunitty.id,
      office: jobOpportunitty.props.office,
      requirements: jobOpportunitty.props.requirements,
      hours: jobOpportunitty.props.hours,
      wage: jobOpportunitty.props.wage,
      name: jobOpportunitty.props.name,
      age: jobOpportunitty.props.age,
      marital_status: jobOpportunitty.props.maritalStatus,
      nationality: jobOpportunitty.props.nationality,
      email: jobOpportunitty.props.email,
      phone: jobOpportunitty.props.phone,
      address: jobOpportunitty.props.address,
      academic_education: jobOpportunitty.props.academicEducation,
      intended_salary: jobOpportunitty.props.intendedSalary,
      desired_job_title: jobOpportunitty.props.desiredJobTitle,
      company_name: jobOpportunitty.props.companyName,
      position_held: jobOpportunitty.props.positionHeld,
      company_contact: jobOpportunitty.props.companyContact,
    }
  }
}
