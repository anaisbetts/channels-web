import { existsSync, readFileSync } from 'fs'
import { writeFile } from 'fs/promises'
import {
  Subject,
  catchError,
  debounceTime,
  defer,
  from,
  of,
  switchMap,
} from 'rxjs'
import { d, i } from './logger'

export class LocalStorage {
  _path: string
  _data: Record<string, any>
  _shouldUpdate: Subject<void> = new Subject()

  constructor(path: string) {
    this._path = path

    d(`Creating LocalStorage at ${path}`)
    if (existsSync(path)) {
      i(`Reading storage from ${path}`)
      this._data = JSON.parse(readFileSync(path, 'utf8'))
    } else {
      this._data = {}
    }

    this._shouldUpdate
      .pipe(
        debounceTime(500),
        switchMap((_) =>
          defer(() => from(this.save())).pipe(catchError(() => of())),
        ),
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
