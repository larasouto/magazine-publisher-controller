
type JobOpportunityOverrides = {
  office?: string
  requirements?: string
  hours?: string
  wage?: string
  name?: string
  age?: string
  marital_status?: string
  nationality?: string
  email?: string
  phone?: string
  address?: string
  academic_education?: string
  intended_salary?: string
  desired_job_title?: string
  company_name?: string
  position_held?: string
  company_contact?: string
}

export class JobOpportunityFactory {
  static create(overrides?: JobOpportunityOverrides) {
    const jobOpportunity = JobOpportunity.create({
      office: 'test-officeEdit15',
      requirements: 'tetJobOp15',
      hours: '5',
      wage: '3.005',
      name: 'test-new-jobOpportunity-candidate',
      age: '25',
      maritalStatus: 'Single15',
      nationality: 'Brazil15',
      email: 'test-newjobOpportunity@email.com',
      phone: '(11) 84285-6875',
      address: 'test-address15',
      academicEducation: 'test-academic-education15',
      intendedSalary: '2.105',
      desiredJobTitle: 'test-desired-job-title15',
      companyName: 'test-company-name15',
      positionHeld: 'test-position-held15',
      companyContact: '(67) 93222-7655',
      ...overrides,
    })

    return jobOpportunity.value as JobOpportunity
  }
}
