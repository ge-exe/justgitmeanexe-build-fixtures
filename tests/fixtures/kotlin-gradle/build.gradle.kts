plugins {
    application
    kotlin("jvm") version "2.1.20"
}

repositories { mavenCentral() }

kotlin { jvmToolchain(21) }

dependencies { implementation(kotlin("stdlib")) }

application {
    mainClass.set("example.MainKt")
}
