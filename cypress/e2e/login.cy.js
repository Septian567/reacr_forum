/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when Email is empty
 *   - should display alert when password is empty
 *   - should display error message when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe("Login spec", () => {
  const baseUrl = "http://localhost:5173"; // ganti sesuai URL dev kamu

  beforeEach(() => {
    cy.visit(`${baseUrl}/login`);
  });

  describe("Login Spec", () => {
    const baseUrl = "http://localhost:5173";

    beforeEach(() => {
      cy.visit(`${baseUrl}/login`);
    });

    it("should display login page correctly", () => {
      // Cek elemen judul halaman
      cy.contains("Selamat Datang").should("be.visible");

      // Cek input email
      cy.get('input[placeholder="Email"]').should("be.visible");

      // Cek input password
      cy.get('input[placeholder="Password"]').should("be.visible");

      // Cek tombol login
      cy.get('button[type="submit"]').contains("Login").should("be.visible");

      // Cek link ke register
      cy.contains("Belum punya akun?").should("be.visible");
      cy.get("button").contains("Register").should("be.visible");
    });

    it("should display alert when Email is empty", () => {
      // Isi hanya password
      cy.get('input[placeholder="Password"]').type("somepassword");

      // Dengarkan alert
      cy.on("window:alert", (text) => {
        expect(text).to.equal("Mohon isi semua kolom!");
      });

      // Klik tombol login
      cy.get('button[type="submit"]').click();
    });

    it("should display alert when Password is empty", () => {
      // Isi hanya email
      cy.get('input[placeholder="Email"]').type("user@example.com");

      // Dengarkan alert
      cy.on("window:alert", (text) => {
        expect(text).to.equal("Mohon isi semua kolom!");
      });

      // Klik tombol login
      cy.get('button[type="submit"]').click();
    });

    it("should display alert when both Email and Password are empty", () => {
      // Pastikan kedua field kosong (defaultnya memang kosong)
      cy.get('input[placeholder="Email"]').should("have.value", "");
      cy.get('input[placeholder="Password"]').should("have.value", "");

      // Dengarkan alert
      cy.on("window:alert", (text) => {
        expect(text).to.equal("Mohon isi semua kolom!");
      });

      // Klik tombol login
      cy.get('button[type="submit"]').click();
    });

    it("should show error message when email/password is wrong", () => {
      cy.intercept("POST", "/api/login", {
        statusCode: 401,
        body: {
          error: "Unauthorized",
        },
        delay: 500,
      }).as("loginRequest");

      cy.get('input[type="email"]').type("wrong@example.com");
      cy.get('input[type="password"]').type("wrongpassword245");

      cy.get('button[type="submit"]').click();

      cy.get('[data-testid="error-message"]')
        .should("be.visible")
        .and("contain.text", "email or password is wrong");
    });
    
    it("should redirect to homepage after successful login", () => {
      // 1. Mock API response untuk login sukses
      cy.intercept("POST", "/api/login", {
        statusCode: 200,
        body: {
          token: "fake-jwt-token",
          user: {
            id: 1,
            name: "Budi",
            email: "Bud2@gmail.com",
          },
        },
        delay: 500,
      }).as("loginRequest");

      // 2. Isi form dengan data yang benar
      cy.get('input[type="email"]').type("Bud2@gmail.com");
      cy.get('input[type="password"]').type("Budi12345");

      // 3. Submit form
      cy.get('button[type="submit"]').click();

      // 4. Verifikasi redirect ke homepage
      cy.url().should("eq", "http://localhost:5173/");
    });
  });
});
