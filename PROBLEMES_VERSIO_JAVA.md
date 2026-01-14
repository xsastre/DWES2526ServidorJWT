<img src="https://docencia.xaviersastre.cat/imatges/logosxs/logo_xaviersastre_v3_1.webp" alt="drawing" width="50%"/>

[![Desenvolupat amb Spring-Boot](https://img.shields.io/badge/Desenvolupat%20amb-SpringBoot-green?&logo=springboot&logoColor=white)](https://github.com/xsastre)
[![per en](https://img.shields.io/badge/per%20en-xsastre-red)](https://github.com/xsastre)
[![Desenvolupat al des-2025](https://img.shields.io/badge/Desenvolupat%20al-des--2025-yellow)](https://github.com/xsastre)

Si està experimentant problemes a l'hora de fer mvn clean compile, és molt possible que estigui originat per la versió especificada (`release 17`) al compilador Maven no és compatible amb el teu entorn actual. Això pot ser degut a que el teu entorn o configuració no té el **JDK 17** correctament instal·lat o configurat.

Aquí tens els passos per solucionar el problema:

---

### 1. **Verifica la teva versió de Java**
Executa el següent comandament per verificar la versió de Java que tens instal·lada actualment:

```bash
java -version
```

Per exemple, hauries de veure una sortida similar si tens correctament instal·lat el JDK 17:
```bash
openjdk version "17.0.X" 2023-YY-ZZ
```

---

### 2. **Configura el JDK correcte**
Si la sortida anterior no mostra la versió 17, has d’instal·lar o configurar el JDK 17. Aquí tens com fer-ho:

#### a. **Instal·la el JDK 17**
Si fas servir un sistema basat en Debian o Ubuntu, utilitza:
```bash
sudo apt update
sudo apt install openjdk-17-jdk
```

#### b. **Estableix el JDK per defecte**
```bash
sudo update-alternatives --config java
sudo update-alternatives --config javac
```
Selecciona l’opció que apunti al JDK 17.

---

### 3. **Configura Maven per utilitzar el JDK correcte**
Afegeix o actualitza l’arxiu de configuració `JAVA_HOME` perquè apunti al JDK 17.

#### a. Verifica la ruta d’instal·lació del JDK 17
```bash
sudo update-alternatives --display java
```

Això mostrarà rutes similars a:
```
/usr/lib/jvm/java-17-openjdk-amd64
```

#### b. Estableix `JAVA_HOME` al teu terminal:
```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
```

#### c. Per fer-ho permanent:
Afegeix aquestes línies al teu arxiu `~/.bashrc` o `~/.zshrc`:
```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
```

Carrega de nou la configuració executant:
```bash
source ~/.bashrc
# o per zsh
source ~/.zshrc
```

---

### 4. **Configuració al projecte (Opcional)**
Comprova que l’arxiu `pom.xml` al teu projecte estigui correctament configurat a la secció de compilació de Maven amb el `source` i `target` per Java 17:

```xml
<properties>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
</properties>
```

Després, neteja i torna a compilar el projecte:
```bash
mvn clean compile
```

---

### 5. **Torna a intentar la compilació**
Executa de nou el comandament:
```bash
mvn -clean compile
```

Si has seguit correctament els passos anteriors, el problema hauria de quedar resolt.
