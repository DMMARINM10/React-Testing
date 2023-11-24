import { getSaludo } from "../base-pruebas/02-template-string";
import { getUser, getUsuarioActivo } from "../base-pruebas/05-funciones";
import { retornaArreglo } from "../base-pruebas/07-deses-arr";
import { getHeroeById, getHeroesByOwner } from "../base-pruebas/08-imp-exp";
import { getHeroeByIdAsync } from "../base-pruebas/09-promesas";
import { getImagen } from "../base-pruebas/11-async-await";
// test("Test", () => {
//   // 1. Initialization
//   const message1 = "Hola Mundo";
//   // 2. Stimulation
//   const message2 = "Hola Mundo";
//   // 3. Expected behaviour
//   expect(message1).toBe(message2);
// });

describe("Tests in 02-template-string", () => {
  test("getSaludo should return 'Hola Fernando'", () => {
    const name = "Fernando";
    const message = getSaludo(name);
    expect(message).toBe(`Hola ${name}`);
  });
});

describe("Tests in 05-funciones", () => {
  test("getUser should return an object", () => {
    const testUser = {
      uid: "ABC123",
      username: "El_Papi1502",
    };
    const user = getUser();
    expect(testUser).toEqual(user);
  });

  test("getUserActivo should return an object", () => {
    const name = "Danna";
    const testUser = {
      uid: "ABC567",
      username: name,
    };
    const user = getUsuarioActivo(name);
    expect(testUser).toEqual(user);
  });
});

describe("Tests in 07-deses-arr", () => {
  test("retornaArreglo should return an array, first string, second number", () => {
    const [letters, numbers] = retornaArreglo();
    expect(typeof letters).toBe("string");
    expect(typeof numbers).toBe("number");
    expect(letters).toEqual(expect.any(String));
    expect(numbers).toEqual(expect.any(Number));
  });
});

describe("Tests in 08-imp-exp", () => {
  test("getHeroeById should return an existent hero", () => {
    const id = 1;
    const hero = getHeroeById(id);
    expect(hero).toEqual({
      id: 1,
      name: "Batman",
      owner: "DC",
    });
  });

  test("getHeroeById should return undefined for a unexistent hero", () => {
    const id = 100;
    const hero = getHeroeById(id);
    expect(hero).toBe(undefined);
    expect(hero).toBeFalsy(); //false values like false, '', 0, undefined, null
  });

  test("getHeroesByOwner should return an array with DC heroes", () => {
    const owner = "DC";
    const heroes = getHeroesByOwner(owner);
    expect(heroes).toEqual([
      {
        id: 1,
        name: "Batman",
        owner: "DC",
      },
      {
        id: 3,
        name: "Superman",
        owner: "DC",
      },
      {
        id: 4,
        name: "Flash",
        owner: "DC",
      },
    ]);
  });

  test("getHeroesByOwner should return an array with Marvel heroes", () => {
    const owner = "Marvel";
    const heroes = getHeroesByOwner(owner);
    expect(heroes).toEqual([
      {
        id: 2,
        name: "Spiderman",
        owner: "Marvel",
      },
      {
        id: 5,
        name: "Wolverine",
        owner: "Marvel",
      },
    ]);
  });
});

describe("Tests in 09-promesas", () => {
  test("getHeroeByIdAsync should return an existent hero", (done) => { //this is like await, telling it to wait
    const id = 1;
    getHeroeByIdAsync(id).then((hero) => {
      expect(hero).toEqual({
        id: 1,
        name: "Batman",
        owner: "DC",
      })
      done() //This is to telling it to stop waiting, inside then
    })
  });

  test("getHeroeByIdAsync should return an error msg for an unexistent hero", (done) => {
    const id = 100;
    getHeroeByIdAsync(id).catch((error) => {
      expect(error).toEqual('No se pudo encontrar el héroe')
      done() //This is to telling it to stop waiting, inside then
    })
  });
});

describe("Tests in 11-async-await", () => {
  test("geImagen should return a url", async() => {
    const url = await getImagen();
    expect(url).toContain('http')
  });

  test("geImagen should return an error message", async() => {
    const resp = await getImagen('noValidApiKey');
    expect(resp).toBe('No se encontró la imagen')
  });
});
