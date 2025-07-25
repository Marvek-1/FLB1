"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Globe, Brain, Users, DollarSign, Vote, Share2, Hammer } from "lucide-react"

export default function LaunchPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24">
        <header className="text-center mb-20">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 flame-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Flameborn: Rekindling Hope in Africa's Rural Healthcare
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            A Beacon in the Darkness
          </motion.p>
        </header>

        <motion.section
          className="prose prose-invert prose-lg max-w-none mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-xl leading-relaxed">
            In the silent hours before dawn, deep in the heart of rural Africa, a nurse leans over a patient. Her only
            light is a flickering kerosene lamp.
            <br />
            Her only tools — resolve and compassion.
          </p>

          <p className="text-xl leading-relaxed">
            The clinic walls are worn. The shelves? Bare.
            <br />
            But she is still here — holding the line between life and loss.
          </p>

          <p className="text-xl leading-relaxed">
            She has no headline.
            <br />
            No salary.
            <br />
            No promise of help.
          </p>

          <p className="text-xl leading-relaxed">But she stays.</p>

          <p className="text-2xl font-bold">
            <span className="flame-text">And Flameborn is here to tell the world: She is not alone anymore.</span>
          </p>
        </motion.section>

        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Globe className="mr-3 text-ember-orange" /> The Challenge We Face
          </h2>

          <div className="flame-card p-6 mb-8">
            <p className="mb-4">
              Millions of Africa's healthcare workers — midwives, nurses, outreach teams — are holding up the very
              foundation of our health systems.
              <br />
              And they're doing it with <strong>nothing</strong>.
            </p>

            <p className="mb-4">
              In many African countries, community health workers show up every day <strong>without pay</strong>,
              without supplies, without rest.
            </p>

            <p className="mb-4">Global aid is pledged. Billions flow.</p>

            <p className="mb-4">But by the time it trickles down?</p>

            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">
                💸 <em>30% has disappeared into red tape, middlemen, corruption</em>
              </li>
              <li className="mb-2">🏥 The clinic receives nothing</li>
              <li className="mb-2">🕯️ The nurse lights another candle</li>
            </ul>

            <p className="text-xl font-semibold">
              We've waited long enough.
              <br />
              <span className="flame-text">Flameborn is the answer that doesn't wait.</span>
            </p>
          </div>
        </motion.section>

        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Heart className="mr-3 text-flame-red" /> What Is Flameborn?
          </h2>

          <div className="flame-card p-6">
            <p className="mb-4">
              Flameborn is not a charity.
              <br />
              Not a startup.
              <br />
              Not a government program.
            </p>

            <p className="mb-4">
              It is a <strong>decentralized movement</strong> of Africans and allies
              <br />
              who believe that <strong>healers should never be left behind</strong>.
            </p>

            <p className="mb-4">
              We are builders.
              <br />
              We are believers.
              <br />
              We are the Flameborn.
            </p>
          </div>
        </motion.section>

        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <ArrowRight className="mr-3 text-healing-blue" /> How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="flame-card p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <DollarSign className="mr-2 text-ember-orange" /> Direct Aid via Blockchain
              </h3>
              <p>
                Donations go straight into digital wallets of verified rural healthcare workers.
                <br />
                No banks. No bureaucracy. No "lost in transit."
                <br />
                Every transaction is <strong>public, traceable, and real</strong>.
              </p>
            </div>

            <div className="flame-card p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Vote className="mr-2 text-ember-orange" /> Community Governance (DAO)
              </h3>
              <p>
                The Flameborn DAO is open to all.
                <br />
                You don't need permission to care.
                <br />
                Vote on where funds go. Help decide which regions we support next.
                <br />
                <em>Every supporter is a leader.</em>
              </p>
            </div>

            <div className="flame-card p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Brain className="mr-2 text-ember-orange" /> AI-Driven Transparency
              </h3>
              <p>
                Smart systems track every token.
                <br />
                You'll see where it went, when it arrived, and what it did.
                <br />
                If something goes wrong, the system says so — <strong>publicly</strong>.<br />
                There are no secrets in the Flame.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.7 }}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Users className="mr-3 text-healing-blue" /> Real People. Real Impact.
          </h2>

          <div className="flame-card p-6">
            <p className="mb-4">
              In early pilots across <strong>rural Kenya, Nigeria, and Ghana</strong>:
            </p>

            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">A midwife received funds to restock birthing supplies</li>
              <li className="mb-2">A nurse used her stipend to repair a solar fridge for vaccines</li>
              <li className="mb-2">A health agent finally had enough to reach families across rivers</li>
            </ul>

            <p className="mb-4">
              These aren't handouts.
              <br />
              They're <strong>affirmations</strong>:
            </p>

            <p className="text-xl font-semibold">
              We see you.
              <br />
              We honor you.
              <br />
              We invest in your care — because you cared for us.
            </p>
          </div>
        </motion.section>

        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Heart className="mr-3 text-flame-red" /> This Is a Movement. Not a Moment.
          </h2>

          <div className="flame-card p-6">
            <p className="text-xl leading-relaxed">
              Flameborn is not just a website.
              <br />
              It's <strong>Ubuntu in code.</strong>
              <br />
              It's <strong>compassion on the chain.</strong>
              <br />
              It's the <strong>spirit of Africa</strong>, digitized, decentralized, and rising.
            </p>
          </div>
        </motion.section>

        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.3 }}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Hammer className="mr-3 text-healing-blue" /> How You Can Join the Flame
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flame-card p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <DollarSign className="mr-2 text-ember-orange" /> Donate
              </h3>
              <p>$5 fuels a clinic. $50 funds a stipend. 100% goes direct.</p>
              <div className="mt-4">
                <Button className="flame-button">Donate Now</Button>
              </div>
            </div>

            <div className="flame-card p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Vote className="mr-2 text-ember-orange" /> Join the DAO
              </h3>
              <p>Help guide aid. Propose, vote, change lives.</p>
              <div className="mt-4">
                <Button className="flame-button">Join DAO</Button>
              </div>
            </div>

            <div className="flame-card p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Share2 className="mr-2 text-ember-orange" /> Spread the Word
              </h3>
              <p>Tell your tribe. Light another torch.</p>
              <div className="mt-4">
                <Button className="flame-button">Share</Button>
              </div>
            </div>

            <div className="flame-card p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Hammer className="mr-2 text-ember-orange" /> Volunteer
              </h3>
              <p>Coders, designers, medics, storytellers — your gifts matter here.</p>
              <div className="mt-4">
                <Button className="flame-button">Join Us</Button>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Globe className="mr-3 text-healing-blue" /> A Final Word to Every Soul Who Reads This
          </h2>

          <div className="flame-card p-6">
            <p className="text-xl leading-relaxed mb-4">
              You are not small.
              <br />
              You are not powerless.
              <br />
              You are <strong>a match. A spark. A carrier of flame.</strong>
            </p>

            <p className="text-xl leading-relaxed mb-4">
              In the darkest corners of our continent, someone is still hoping.
              <br />
              Still healing.
              <br />
              Still holding on.
            </p>

            <p className="text-xl font-bold">
              <span className="flame-text">
                Light their fire again.
                <br />
                Let them know they are not forgotten.
                <br />
                Let them feel Africa — and the world — rising with them.
              </span>
            </p>
          </div>
        </motion.section>

        <motion.footer
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.9 }}
        >
          <h2 className="text-3xl font-bold mb-6 flame-text">🔥 Flameborn: Lighting the Path to Health and Hope</h2>

          <p className="text-xl mb-8">
            Because <strong>hope is a flame</strong>.<br />
            And now — it lives on the chain.
          </p>

          <div className="flex justify-center gap-4">
            <Link href="/">
              <Button className="flame-button">Return Home</Button>
            </Link>
            <Button className="flame-button ember-pulse">Join the Movement</Button>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}
