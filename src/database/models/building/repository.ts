import { BuildingDocument, BuildingModel } from './document'

import { BuildingEntity } from '../../../core/building/domain/entity'
import { BuildingRepository } from '../../../core/building/repository'
import { MongoGenericRepository } from '../../generic'

export class MongoBuildingRepository
  extends MongoGenericRepository<typeof BuildingModel, BuildingDocument, BuildingEntity>
  implements BuildingRepository {

  protected buildFromModel(document: BuildingDocument | null): BuildingEntity | null {
    if (!document) {
      return null
    }

    return BuildingEntity.create({
      id: document._id.toString(),
      code: document.code,
      level: document.level,
      city_id: document.city_id.toString(),
      upgrade_time: document.upgrade_time
    })
  }
}
