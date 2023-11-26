import { MapperError } from '@/core/errors/MapperErrors'
import { Candidate as PersistenceCandidate } from '@prisma/client'
import { Candidate } from '../domain/candidate'
import { jobOpportunities } from '@/infra/http/routes/job-opportunities.routes'

export class CandidateMapper {
  static toDomain(
    raw: PersistenceCandidate,
    jobOpportunities: string[],
  ) {
    const candidateOrError = Candidate.create(
      {
        pdfPath: raw.pdf_path,
        name: raw.name,
        age: raw.age,
        maritalStatus: raw.marital_status,
        nationality: raw.nationality,
        email: raw.email,
        phone: raw.phone,
        address: raw.address,
        academicEducation: raw.academic_education,
        intendedSalary: raw.intended_salary,
        desiredJobTitle: raw.desired_job_title,
        companyName: raw.company_name,
        positionHeld: raw.position_held,
        companyContact: raw.company_contact,
        jobOpportunities: jobOpportunities,
      },
      raw.id,
    )

    if (candidateOrError.isLeft()) {
      throw new MapperError(candidateOrError.value.message)
    }

    return candidateOrError.value
  }

  static async toPersistence(candidate: Candidate) {
    return {
      id: candidate.id,
      pdf_path: candidate.props.pdfPath,
      name: candidate.props.name,
      age: candidate.props.age,
      marital_status: candidate.props.maritalStatus,
      nationality: candidate.props.nationality,
      email: candidate.props.email,
      phone: candidate.props.phone,
      address: candidate.props.address,
      academic_education: candidate.props.academicEducation,
      intended_salary: candidate.props.intendedSalary,
      desired_job_title: candidate.props.desiredJobTitle,
      company_name: candidate.props.companyName,
      position_held: candidate.props.positionHeld,
      company_contact: candidate.props.companyContact,
      jobOpportunities: jobOpportunities,
    }
  }
}
