import { readFileSync } from 'fs'
import { writeFile } from 'fs/promises'
import { Subject, debounceTime, defer, from, switchMap } from 'rxjs'

export class LocalStorage {
  _path: string
  _data: Record<string, any>
  _shouldUpdate: Subject<void> = new Subject()

  constructor(path: string) {
    this._path = path
    this._data = JSON.parse(readFileSync(path, 'utf8'))

    this._shouldUpdate
      .pipe(
        debounceTime(500),
        switchMap((_) => defer(() => from(this.save()))),
      )
      .subscribe()
  }

  data() {
    return this._data
  }

  keys() {
    return Object.keys(this._data)
  }

  values() {
    return Object.values(this._data)
  }

  set(key: string, value: any) {
    this._data[key] = value
    this._shouldUpdate.next()
  }

  get(key: string) {
    return this._data[key]
  }

  del(key: string) {
    delete this._data[key]
    this._shouldUpdate.next()
  }

  clear() {
    this._data = {}
    this._shouldUpdate.next()
  }

  async save(): Promise<void> {
    await writeFile(this._path, JSON.stringify(this._data))
  }
}
