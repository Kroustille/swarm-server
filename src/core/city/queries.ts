import { CityEntity } from './domain/entity'
import { CityErrors } from './domain/errors'
import { CityRepository } from './repository'
import { FilterQuery } from '../../types/database'
import { SIZE_PER_CELL } from './domain/constants'

export class CityQueries {
  private repository: CityRepository

  public constructor(repository: CityRepository) {
    this.repository = repository
  }

  public async hasResources(query: { id: string, plastic: number, mushroom: number }): Promise<boolean> {
    const city = await this.repository.findById(query.id)
    if (!city) {
      throw new Error(CityErrors.NOT_FOUND)
    }

    return city.hasResources(query)
  }

  public async canBuild({ name }: { name: string }): Promise<boolean> {
    const does_city_with_same_name_exists = await this.repository.exists({ name })
    return !does_city_with_same_name_exists
  }

  public async findOne(query: FilterQuery<CityEntity>): Promise<CityEntity | null> {
    return this.repository.findOne(query)
  }

  public async findByIdOrThrow(id: string): Promise<CityEntity> {
    const city = await this.repository.findById(id)
    if (!city) {
      throw new Error(CityErrors.NOT_FOUND)
    }

    return city
  }

  public async hasSizeToBuild(id: string): Promise<boolean> {
    return true
  }
}

export const getMaxSize = (city: CityEntity): number => {
  return city.cells.length * SIZE_PER_CELL
}
